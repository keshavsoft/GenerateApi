const vscode = require('vscode');
const fs = require('fs');

const { StartFunc: StartFuncFromForMaxVersion } = require("./ForMaxVersion/entryFile");
const { StartFunc: StartFuncFromOpenApp } = require("./openApp");
const { StartFunc: StartFuncFromReadEnvFile } = require("./readEnvFile");
const { StartFunc: StartFuncFromFirstCopy } = require("./FirstCopy/entryFile");
const { StartFunc: StartFuncFromGetMaxVersion } = require("./getMaxVersion");
const { StartFunc: StartFuncFromLastRun } = require("./LastRun/entryFile");
// const { StartFunc: StartFuncrunNodeApp } = require("./serverRun");

const { StartFunc: StartFuncFromRecur } = require("./ForRestClients/entryFile");

const StartFunc = async ({ inToPath }) => {
    const LocalToPath = inToPath;

    let LocalVersion = await LocalFuncForNonSecureEndPoints({ inToPath });

    if (LocalVersion === false) {
        return await false;
    };

    StartFuncFromLastRun({
        filePath: `${LocalToPath}/app.js`,
        newVersion: LocalVersion,
        inToPath: LocalToPath
    });

    vscode.window.showInformationMessage(`BoilerPlate code to: ${LocalToPath}`);

    await StartFuncFromOpenApp({ inToPath: LocalToPath });
    // StartFuncrunNodeApp(LocalToPath)
};

const LocalFuncForNonSecureEndPoints = async ({ inToPath }) => {
    const LocalToPath = inToPath;

    let LocalVersion = await LocalFuncForMaxVersion({
        inVersionStart: "V",
        inToPath: LocalToPath
    });

    if (LocalVersion === false) {
        return false;
    };

    const LocalEnvFileAsJson = StartFuncFromReadEnvFile({ inRootPath: LocalToPath });

    if (LocalEnvFileAsJson == null) {
        vscode.window.showInformationMessage(`.env file not present...`);

        return false;
    };

    const LocalDataPath = LocalEnvFileAsJson.DataPath ? LocalEnvFileAsJson.DataPath : "";
    const LocalPortNumber = LocalEnvFileAsJson.PORT ? LocalEnvFileAsJson.PORT : "";

    const LocalSuccess = await StartFuncFromForMaxVersion({
        inDataPath: LocalDataPath,
        inPortNumber: LocalPortNumber,
        inToPath: LocalToPath,
        inVersion: LocalVersion
    });

    if (LocalSuccess == false) {
        vscode.window.showInformationMessage(`no table schema found...`);

        return await false;
    };

    StartFuncFromRecur(inToPath.replaceAll("\\", "/"), `${inToPath}/${LocalVersion}`, LocalVersion, LocalPortNumber);

    return await LocalVersion;
};

const LocalFuncCheckAppJs = ({ inToPath }) => {
    return fs.existsSync(`${inToPath}/app.js`)
};

const LocalFuncForMaxVersion = async ({ inVersionStart, inToPath }) => {
    const LocalToPath = LocalFuncGetWorkSpaceFolder();
    let LocalVersion = `${inVersionStart}1`;

    const LocalFromMaxVersion = await StartFuncFromGetMaxVersion({
        inToPath: LocalToPath,
        inVersionStart
    });

    if (LocalFromMaxVersion === 0) {
        if (LocalFuncCheckAppJs({ inToPath }) === false) {
            const LocalFromCopy = await StartFuncFromFirstCopy({ inToPath: LocalToPath });

            if (LocalFromCopy === false) {
                return false;
            };
        };
    } else {
        LocalVersion = `${inVersionStart}${LocalFromMaxVersion}`;
    };

    return LocalVersion;
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
