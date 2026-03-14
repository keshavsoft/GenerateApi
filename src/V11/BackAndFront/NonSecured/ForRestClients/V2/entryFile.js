const vscode = require('vscode');
const path = require('path');

const { StartFunc: createHttpFile } = require('./createHttpFile');

const StartFunc_12May2026 = async ({ rootPath, inPortNumber, inColumnsAsArray }) => {
    // find all controller.js files in workspace
    const files = await vscode.workspace.findFiles("**/controller.js");

    for (const file of files) {
        const currentPath = path.dirname(file.fsPath);

        createHttpFile({ rootPath, currentPath, inPortNumber, inColumnsAsArray });
    };
};

const StartFunc = async ({ rootPath, inPortNumber, inColumnsAsArray, inVersion }) => {
    const files = await vscode.workspace.findFiles(`**/${inVersion}/**/controller.js`);

    for (const file of files) {
        const currentPath = path.dirname(file.fsPath);
        createHttpFile({ rootPath, currentPath, inPortNumber, inColumnsAsArray, inVersion });
    };
};

module.exports = { StartFunc };