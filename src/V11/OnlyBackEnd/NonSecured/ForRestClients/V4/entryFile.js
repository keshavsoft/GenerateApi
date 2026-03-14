const vscode = require('vscode');
const path = require('path');

const { StartFunc: createHttpFile } = require('./createHttpFile');

const StartFunc = async ({ inToPathRoot, inPortNumber, inVersion }) => {
    const files = await vscode.workspace.findFiles(`**/${inVersion}/**/controller.js`);

    for (const file of files) {
        const currentPath = path.dirname(file.fsPath);

        createHttpFile({
            inToPathRoot,
            inCurrentPath: currentPath, inPortNumber, inVersion
        });
    };
};

module.exports = { StartFunc };