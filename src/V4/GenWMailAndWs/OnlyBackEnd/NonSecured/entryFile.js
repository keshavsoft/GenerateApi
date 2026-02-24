const vscode = require("vscode");

const COMMAND = "OnlyBackEnd.NonSecured";
const { StartFunc: Activate } = require("./ToActivate/entryFile");

const StartFunc = () => {
    console.log("Registering command", COMMAND);

    vscode.commands.registerCommand(COMMAND, async () => {
        try {
            const rootPath = getWorkspaceRoot();
            if (!rootPath) return;

            console.log("Workspace root", rootPath);

            const activated = await Activate({ inToPath: rootPath });
            if (!activated) {
                console.log("Activation aborted");
                vscode.window.showErrorMessage("Activation aborted");
                return;
            }

            console.log("Task completed");
            vscode.window.showInformationMessage("Task completed");
        } catch (err) {
            console.log("❌ Command failed", err.message);
            vscode.window.showErrorMessage("Command execution failed");
        }
    });
};

/* ---------- HELPERS ---------- */

const getWorkspaceRoot = () => {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders || folders.length === 0) {
        vscode.window.showErrorMessage("Please open a folder in VS Code");
        return null;
    }

    return folders[0].uri.fsPath;
};

module.exports = { StartFunc };