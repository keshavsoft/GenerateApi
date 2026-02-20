const vscode = require('vscode');

const CommonRegisterCommand = "OnlyBackEnd.NonSecured";

const { StartFunc: StartFuncFromFuncToActivate } = require("./funcToActivate");
const { StartFunc: StartFuncrunNodeApp } = require("./serverRun");

const StartFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, async () => {
        const LocalToPath = LocalFuncgetWorkspaceRoot();

        const LocalFromActivate = await StartFuncFromFuncToActivate({ inToPath: LocalToPath });

        if (LocalFromActivate === false) {
            return false;
        };

        StartFuncrunNodeApp(LocalToPath);
    });
};

const LocalFuncgetWorkspaceRoot = () => {
    const folders = vscode.workspace.workspaceFolders;

    console.log("Workspace folders:", folders);

    if (!folders || folders.length === 0) {
        console.log("❌ No workspace open");
        return null;
    };

    const rootPath = folders[0].uri.fsPath;
    console.log("✅ Workspace root path:", rootPath);

    return rootPath;
};



module.exports = { StartFunc };
