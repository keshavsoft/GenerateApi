const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

const { StartFunc: CreateTables } = require("./TableCreate");
const { StartFunc: CheckSchema } = require("../../CommonFuncs/entryFile");

const ROUTE_TYPE = "NonSecured";
const API_FILE = "api";

/* ---------- READ ROOT api.json ---------- */

const readApiSchema = ({ inRootPath }) => {
    try {
        const data = fs.readFileSync(`${inRootPath}/${API_FILE}.json`, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log("❌ Failed to read api.json", err.message);
        return null;
    }
};

/* ---------- READ TABLE SCHEMA ---------- */

const readTableSchema = ({ inRootPath }) => {
    try {
        return JSON.parse(fs.readFileSync(inRootPath, "utf-8"));
    } catch (err) {
        console.log("❌ Failed to read table schema", inRootPath);
        return null;
    }
};

/* ---------- VALIDATE TABLE ---------- */

const validateTable = ({ columns, tableName, tableJson }) => {
    console.log("Validating table", tableName);

    if (!CheckSchema({ inColumnsAsArray: columns, inTableName: tableName })) {
        console.log("❌ Invalid column schema", tableName);
        return false;
    }

    if (!tableJson[ROUTE_TYPE]) {
        vscode.window.showInformationMessage(`${ROUTE_TYPE} missing in ${tableName}`);
        return false;
    }

    if (!tableJson[ROUTE_TYPE].SubRoutes) {
        vscode.window.showInformationMessage(`SubRoutes missing in ${tableName}`);
        return false;
    }

    return true;
};

/* ---------- MAIN ---------- */

const StartFunc = async ({ inDataPath, inPortNumber, inToPath, inVersion }) => {
    console.log("Start table creation", inToPath);

    const apiSchema = readApiSchema({ inRootPath: inToPath });
    if (!apiSchema) return false;

    const tables = apiSchema.Tables || [];

    if (!(await checkAnyValidTable({ inToPath }))) {
        vscode.window.showInformationMessage("No valid table schema found");
        return false;
    }

    for (const tableName of tables) {
        console.log("Processing table", tableName);

        const schemaPath = path.join(inToPath, "Schemas", `${tableName}.json`);
        const tableJson = readTableSchema({ inRootPath: schemaPath });
        if (!tableJson) continue;

        const columnsSchema = tableJson.columns || [];
        const columns = columnsSchema.map(c => c.field);
        const data = tableJson.Data || [];
        const subRoutes = tableJson[ROUTE_TYPE].SubRoutes || [];

        if (!validateTable({
            columns: columnsSchema,
            tableName,
            tableJson
        })) continue;

        await CreateTables({
            inFromTablePath: path.join(__dirname, "..", tableName),
            inToTablePath: path.join(inToPath, inVersion, tableName),
            inTableName: tableName,
            inColumnsAsArray: columns,
            inColumnsWithSchema: columnsSchema,
            inData: data,
            inDataPath,
            inPortNumber,
            inToPath,
            inVersion,
            inSubRoutes: subRoutes
        });
    }

    console.log("✅ Table creation finished");
    return true;
};

/* ---------- CHECK AT LEAST ONE VALID TABLE ---------- */

const checkAnyValidTable = async ({ inToPath }) => {
    const apiSchema = readApiSchema({ inRootPath: inToPath });
    if (!apiSchema) return false;

    for (const tableName of apiSchema.Tables || []) {
        const schemaPath = path.join(inToPath, "Schemas", `${tableName}.json`);
        const tableJson = readTableSchema({ inRootPath: schemaPath });
        if (!tableJson) continue;

        if (validateTable({
            columns: tableJson.columns,
            tableName,
            tableJson
        })) return true;
    }

    return false;
};

module.exports = { StartFunc };
