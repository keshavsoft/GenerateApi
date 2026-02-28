const vscode = require('vscode');

const { StartFunc: StartFuncFromRouteUse } = require("../RouteUse/entryFile");
const { StartFunc: StartFuncFromCopyNeededOnly } = require("./copyNeededOnly");
const { StartFunc: StartFuncFromAlterRouteFile } = require("./alterRouteFile");
const { StartFunc: StartFuncFromAlterCommonFiles } = require("./alterCommonFiles");

const StartFunc = ({ inTableName, inColumnsAsArray, inSubRoutes, inPortNumber, inToPath, inVersion }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    StartFuncFromCopyNeededOnly({ inTableName, inSubRoutes, inToPath, inVersion, inPortNumber, inColumnsAsArray });

    StartFuncFromAlterRouteFile({ inTableName, inSubRoutes, inToPath, inVersion });
    StartFuncFromAlterCommonFiles({ inTableName, inToPath, inVersion });

    try {
        StartFuncFromRouteUse({
            inEditorPath: `${LocalToPath}/${LocalVersion}/routes.js`,
            inNewRoute: LocalTableName,
            inVersion: LocalVersion,
            inSubRoutes
        });

        vscode.window.showInformationMessage(`BoilerPlate code to: ${LocalToPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };