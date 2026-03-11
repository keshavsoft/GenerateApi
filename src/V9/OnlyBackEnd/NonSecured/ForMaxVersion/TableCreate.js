const { StartFunc: StartFuncFromCopyNeededOnly } = require("./copyNeededOnly");
const { StartFunc: StartFuncFromAlterRouteFile } = require("./alterRouteFile");
const { StartFunc: StartFuncFromAlterCommonFiles } = require("./alterCommonFiles");

const StartFunc = ({ inTableName, inColumnsAsArray, inSubRoutes, inPortNumber, inToPath, inVersion, inForeignkeyTables, inDependantTables, inColumnsWithSchema }) => {
    StartFuncFromCopyNeededOnly({ inTableName, inSubRoutes, inToPath, inVersion, inPortNumber, inColumnsAsArray });

    StartFuncFromAlterRouteFile({ inTableName, inSubRoutes, inToPath, inVersion });
    StartFuncFromAlterCommonFiles({ inTableName, inToPath, inVersion, inForeignkeyTables, inDependantTables, inColumnsWithSchema });
};

module.exports = { StartFunc };