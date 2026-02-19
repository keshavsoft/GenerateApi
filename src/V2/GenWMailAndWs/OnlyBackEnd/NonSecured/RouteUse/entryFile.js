const vscode = require('vscode');
const fse = require('fs-extra');
const { StartFunc: RouteEntry } = require("./Route/entryFile");
const { StartFunc: NewTableEntry } = require("./RouteForNewTable/entryFile");
const { StartFunc: ReadFile } = require("./FileRead");

const checkExistingRoute = (lines, route) =>
    lines.some(line => line.startsWith("router.use(") && line.includes(route));

const StartFunc = async ({ inEditorPath, inNewRoute }) => {
    if (!fse.existsSync(inEditorPath)) {
        return NewTableEntry({ inEditorPath, inNewRoute });
    };

    const lines = await ReadFile({ inFileName: inEditorPath });

    if (checkExistingRoute(lines, inNewRoute)) {
        vscode.window.showInformationMessage(`New end point: ${inNewRoute} is already in the file.`);
        return false;
    }

    RouteEntry({ inLinesArray: lines, inEditorPath, inNewRoute });

    vscode.window.showInformationMessage(`Folder created and contents copied to: ${inNewRoute}`);
};

module.exports = { StartFunc };