const { StartFunc: StartFuncFromReadFolder } = require("./readFolder");
const { StartFunc: StartFuncFromInsertRestFile } = require("./insertRestFile");
const { StartFunc: StartFuncFromReadRestFile } = require("./ReadRestFile");
const { StartFunc: StartFuncFromAlterRestFile } = require("./AlterRestFile");
const { StartFunc: StartFuncFromDeleteRestFile } = require("./DeleteRestFile");
const { StartFunc: StartFuncFromAggregateRestFile } = require("./AggregateRestFile");
const { StartFunc: StartFuncFromSubInsertRestFile } = require("./subInsertRestFile");
const { StartFunc: StartFuncFromSubReadRestFile } = require("./SubReadRestFile");
const { StartFunc: StartFuncFromSubAlterRestFile } = require("./SubAlterRestFile");
const { StartFunc: StartFuncFromSubDeleteRestFile } = require("./SubDeleteRestFile");
const { StartFunc: StartFuncFromGroupByRestFile } = require("./GroupByRestFile");
const { StartFunc: StartFuncFromFilterRestClient } = require("./FilterRestClient");
const { StartFunc: StartFuncFromAddWithDefaultRestClient } = require("./AddWithDefault");
const { StartFunc: StartFuncFromSubOnArrayReadRestFileRestClient } = require("./SubOnArrayReadRestFile");
const { StartFunc: StartFuncFromSubOnArrayInsertRestFileRestClient } = require("./SubOnArrayInsertRestFile");
const { StartFunc: StartFuncFromSubOnArrayAlterRestFileRestClient } = require("./SubOnArrayAlterRestFile");
const { StartFunc: StartFuncFromSubOnArrayDeleteRestFileRestClient } = require("./SubOnArrayDeleteRestFile");
const { StartFunc: StartFuncFrommailRestFile } = require("./mailRestFile");
const { StartFunc: StartFuncFromInsertWithChecksRestFile } = require("./InsertWithChecks");
const { StartFunc: StartFuncFromReadSingleColRestFile } = require("./ReadSingleColRestFile");


const CommonReadSchemaFolderName = "ReadSchema";
const CommonSubTableFunctions = "SubTable";
const CommonSubTableOnArrayFunctions = "SubTableOnArray";
const CommonValidateFunctions = "Validate";
const CommonSubTableOnObj = "SubTableOnObj";


async function StartFunc({ inEditorPath, inTableName, inPortNumber, inVersion, inColumnsAsArray }) {
    const LocalVersion = inVersion;
    const LocalBasePath = `${inEditorPath}/${LocalVersion}/${inTableName}`;

    await StartFuncFromInsertRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Insert`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromReadRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Read`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromAlterRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Alter`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromDeleteRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Delete`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromAggregateRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/AggregateFunctions`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromGroupByRestFile({
        inFolderPath: `${LocalBasePath}/GroupBy`,
        inTableName, inPortNumber
    });

    await StartFuncFromReadFolder({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonReadSchemaFolderName}/RestClients`,
        inTableName, inPortNumber
    });

    await StartFuncFromSubReadRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableFunctions}/Read`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubInsertRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableFunctions}/Insert`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubAlterRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableFunctions}/Alter`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubDeleteRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableFunctions}/Delete`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromInsertRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonValidateFunctions}/RestClients`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromFilterRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Filter`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromAddWithDefaultRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/AddWithDefault`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayReadRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnArrayFunctions}/Read`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayInsertRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnArrayFunctions}/Insert`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayAlterRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnArrayFunctions}/Alter`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayDeleteRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnArrayFunctions}/Delete`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayReadRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnObj}/Read`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayInsertRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnObj}/Insert`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayAlterRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnObj}/Alter`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromSubOnArrayDeleteRestFileRestClient({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/${CommonSubTableOnObj}/Delete`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFrommailRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/Mail`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

    await StartFuncFromInsertWithChecksRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/InsertWithChecks`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

     await StartFuncFromReadSingleColRestFile({
        inFolderPath: `${inEditorPath}/${LocalVersion}/${inTableName}/ReadSingleCol`,
        inTableName, inPortNumber,
        inColumnsAsArray
    });

};

module.exports = { StartFunc };
