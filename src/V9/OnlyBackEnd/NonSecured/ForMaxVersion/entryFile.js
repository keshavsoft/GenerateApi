const vscode = require('vscode');
const path = require('path');
const fs = require("fs");

const { StartFunc: StartFuncFromTableCreates } = require('./TableCreate');
const { StartFunc: StartFuncFromCommonFuncs } = require('../../CommonFuncs/entryFile');
const { StartFunc: createRouteJsFile } = require('./createRouteJsFile');
const { StartFunc: StartFuncFromRecur } = require("../ForRestClients/entryFile");

const CommonRouteType = "NonSecured";
const CommonJsonFileName = "api";
let LocalColumnsAsArray;

const LocalFuncReadSchemaJson = ({ inRootPath }) => {
    try {
        const fileContents = fs.readFileSync(`${inRootPath}/${CommonJsonFileName}.json`, 'utf-8');

        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading .env file:', error);
        return null;
    }
};

const LocalFuncForCheck = ({ inColumnsWithSchema, inTableName, inFromTableJson }) => {
    const LocalColumnsWithSchema = inColumnsWithSchema;
    const LocalTableName = inTableName;
    const LocalFromTableJson = inFromTableJson;

    const LocalFromCheckSchema = StartFuncFromCommonFuncs({
        inColumnsAsArray: LocalColumnsWithSchema,
        inTableName: LocalTableName
    });

    if (LocalFromCheckSchema === false) {
        // vscode.window.showInformationMessage(`field contains invalid char : ${tableName}`);
        return false;
    };

    if (CommonRouteType in LocalFromTableJson === false) {
        vscode.window.showInformationMessage(`NonSecured not found in Json Schema : ${LocalTableName}`);
        return false;
    };

    if ("SubRoutes" in LocalFromTableJson[CommonRouteType] === false) {
        vscode.window.showInformationMessage(`SubRoutes not found in Json Schema : ${LocalTableName}`);
        return false;
    };

    return true;
    //dummy function
};

const StartFunc = async ({ inDataPath, inPortNumber, inToPath, inVersion }) => {
    const localVersion = inVersion;
    const LocalToPath = inToPath;

    const LocalJsonSchema = LocalFuncReadSchemaJson({ inRootPath: LocalToPath });
    const LocalTablesArray = LocalJsonSchema.Tables;

    const LocalFromTableCheck = LocalFuncForTableCheck({ inToPath: LocalToPath })

    if (LocalFromTableCheck === false) {
        return await false;
    };

    for (const tableName of LocalTablesArray) {
        const LoopInsideTablePath = path.join(LocalToPath, "Schemas", `${tableName}.json`);

        const LocalFromTableJson = LocalFuncReadTableSchema({ inRootPath: LoopInsideTablePath });

        LocalColumnsAsArray = LocalFromTableJson.columns.map(el => el.field);
        const LocalColumnsWithSchema = LocalFromTableJson.columns;
        const ForeignkeyTables = LocalFromTableJson.ForeignkeyTables;
        const DependantTables = LocalFromTableJson.DependantTables;

        const LocalFromCheck = LocalFuncForCheck({
            inColumnsWithSchema: LocalColumnsWithSchema,
            inTableName: tableName,
            inFromTableJson: LocalFromTableJson
        });

        if (LocalFromCheck === false) {
            continue;
        };

        const LocalSubRoutes = LocalFromTableJson[CommonRouteType].SubRoutes ? LocalFromTableJson[CommonRouteType].SubRoutes : [];

        await StartFuncFromTableCreates({
            inTableName: tableName,
            inColumnsAsArray: LocalColumnsAsArray,
            inDataPath,
            inPortNumber,
            inToPath: LocalToPath,
            inColumnsWithSchema: LocalColumnsWithSchema,
            inVersion: localVersion,
            inSubRoutes: LocalSubRoutes,
            inForeignkeyTables: ForeignkeyTables,
            inDependantTables: DependantTables
        });

        StartFuncFromRecur(inToPath.replaceAll("\\", "/"), `${inToPath}/${localVersion}`, localVersion, inPortNumber, LocalColumnsAsArray, tableName,);
    };

    createRouteJsFile({
        inSubRoutes: LocalTablesArray,
        inToPath: LocalToPath,
        inVersion: localVersion
    })



    return LocalColumnsAsArray;
};

const LocalFuncForTableCheck = ({ inToPath }) => {
    const LocalToPath = inToPath;

    const LocalJsonSchema = LocalFuncReadSchemaJson({ inRootPath: LocalToPath });
    const LocalTablesArray = LocalJsonSchema.Tables;
    let LocalSuccess = false;

    for (const tableName of LocalTablesArray) {
        const LoopInsideTablePath = path.join(LocalToPath, "Schemas", `${tableName}.json`);

        const LocalFromTableJson = LocalFuncReadTableSchema({ inRootPath: LoopInsideTablePath });

        if (LocalFromTableJson === null) {
            continue;
        };

        const LocalColumnsWithSchema = LocalFromTableJson.columns;

        const LocalFromCheck = LocalFuncForCheck({
            inColumnsWithSchema: LocalColumnsWithSchema,
            inTableName: tableName,
            inFromTableJson: LocalFromTableJson
        });

        if (LocalFromCheck === false) {
            continue;
        };

        LocalSuccess = true;
    };

    if (LocalSuccess === false) {
        return false;
    };
};

function LocalFuncReadTableSchema({ inRootPath }) {
    try {
        const fileContents = fs.readFileSync(inRootPath, 'utf-8');

        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading .env file:', error);
        return null;
    }
};

module.exports = { StartFunc };
