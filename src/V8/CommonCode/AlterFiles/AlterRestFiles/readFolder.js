const fs = require('fs');
const path = require('path');
const readline = require('readline');
const vscode = require('vscode');

async function StartFunc({ inFolderPath, inPortNumber }) {
    try {
        const LocalRootPath = LocalFuncGetWorkSpaceFolder();
        const activeFileFolderPath = path.dirname(inFolderPath);
        const LocalRelativePath = activeFileFolderPath.replace(LocalRootPath, "");

        const files = await fs.readdirSync(inFolderPath);

        for (const file of files) {
            const filePath = path.join(inFolderPath, file);
            const stats = await fs.lstatSync(filePath);

            if (stats.isFile()) {
                let LocalLines = await processLineByLine({ inFileName: filePath });
                LocalLines[0] = LocalLines[0].replace("{PORT}", inPortNumber);
                LocalLines[0] = LocalLines[0].replace("{SubRoute}", LocalRelativePath.replaceAll(`\\`, "/"));

                LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: filePath });
            };
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    };
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

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    fs.writeFileSync(inEditorPath, content, 'utf-8');
};

const processLineByLine = async ({ inFileName }) => {
    try {
        const fileStream = fs.createReadStream(inFileName);
        let LocalLines = [];

        fileStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            LocalLines.push(line);
        };

        return LocalLines;
    } catch (err) {
        console.error(`Error processing file: ${err.message}`);
    }
};

module.exports = { StartFunc };
