const vscode = require("vscode");

const { StartFunc: RouteUse } = require("../RouteUse/entryFile");
const { StartFunc: CopyNeededOnly } = require("./copyNeededOnly");
const { StartFunc: AlterRouteFile } = require("./alterRouteFile");
const { StartFunc: AlterCommonFiles } = require("./alterCommonFiles");

const StartFunc = ({ inTableName, inColumnsAsArray, inSubRoutes, inPortNumber, inToPath, inVersion }) => {
    console.log("Start route build", { inTableName, inVersion });

    try {
        // 1. Copy required files
        CopyNeededOnly({ inTableName, inSubRoutes, inToPath, inVersion, inPortNumber, inColumnsAsArray });
        console.log("Files copied");

        // 2. Alter route & common files
        AlterRouteFile({ inTableName, inSubRoutes, inToPath, inVersion });
        AlterCommonFiles({ inTableName, inToPath, inVersion });
        console.log("Route & common files altered");

        // 3. Register route usage
        RouteUse({
            inEditorPath: `${inToPath}/${inVersion}/routes.js`, inNewRoute: inTableName, inVersion, inSubRoutes
        });
        console.log("Route registered", inTableName);

        vscode.window.showInformationMessage(
            `Boilerplate created for ${inTableName}`
        );
    } catch (error) {
        console.log("❌ Error", error.message);
        vscode.window.showErrorMessage(`Route build failed: ${error.message}`);
    }
};

module.exports = { StartFunc };
