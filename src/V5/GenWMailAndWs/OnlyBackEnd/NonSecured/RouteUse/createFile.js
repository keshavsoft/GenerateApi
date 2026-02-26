const vscode = require('vscode');
const fse = require('fs-extra');
const readline = require('readline');

const { StartFunc: StartFuncFromRoute } = require("./Route/entryFile");

const StartFunc = async ({ inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        const LocalEndPointNeeded = inNewRoute;

        let LocalLines = await processLineByLine({ inFileName: selectedFolder });

        const LocalFindEndPoint = LocalFuncCheckOldEndPoints({
            inLinesArray: LocalLines,
            inNewRoute: LocalEndPointNeeded
        });

        if (LocalFindEndPoint) {
            vscode.window.showInformationMessage(`New end point: ${LocalEndPointNeeded} is already in the file.`);
            return false;
        };

        StartFuncFromRoute({
            inLinesArray: LocalLines, inEditorPath: selectedFolder,
            inNewRoute: LocalEndPointNeeded
        });

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalEndPointNeeded}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

const LocalFuncCheckOldEndPoints = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFilteredRows = LocalLines.filter((element) => element.startsWith("router.use("));
    let LocalFind = LocalFilteredRows.find((element) => element.indexOf(LocalNewRoute) >= 0);

    return LocalFind === undefined ? false : true;
};

const processLineByLine = async ({ inFileName }) => {
    try {
        const fileStream = fse.createReadStream(inFileName);
        let LocalLines = [];

        fileStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            // console.log(`Line: ${line}`);
            LocalLines.push(line);
            // vscode.window.showInformationMessage(`Error: ${line}`);
        };

        return LocalLines;
    } catch (err) {
        console.error(`Error processing file: ${err.message}`);
    }
};

module.exports = { StartFunc };
