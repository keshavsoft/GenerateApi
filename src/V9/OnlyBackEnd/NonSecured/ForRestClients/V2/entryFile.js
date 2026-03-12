const vscode = require('vscode');
const path = require('path');

const { StartFunc: createHttpFile } = require('./createHttpFile');

const StartFunc = async ({ rootPath, inPortNumber, inColumnsAsArray }) => {

    // find all controller.js files in workspace
    const files = await vscode.workspace.findFiles("**/controller.js");

    for (const file of files) {
        const currentPath = path.dirname(file.fsPath);

        createHttpFile({ rootPath, currentPath, inPortNumber, inColumnsAsArray });
    };
};

module.exports = { StartFunc };