const vscode = require('vscode');

const CommonRegisterCommand = "OnlyBackEnd.NonSecured";

const { StartFunc: StartFuncFromFuncToActivate } = require("./funcToActivate");
const { StartFunc: StartFuncrunNodeApp } = require("./serverRun");

const StartFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, async () => {
        const LocalToPath = LocalFuncGetWorkSpaceFolder();

        const LocalFromActivate = await StartFuncFromFuncToActivate({ inToPath: LocalToPath });

        if (LocalFromActivate === false) {
            return false;
        };

        StartFuncrunNodeApp(LocalToPath);
    });
};

const LocalFuncGetWorkSpaceFolder = () => {
    if (vscode.workspace.workspaceFolders) {
        const rootUri = vscode.workspace.workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath; // Get the file path
        return rootPath;
    } else {
        console.log("No workspace folders found.");
    };
};


module.exports = { StartFunc };
