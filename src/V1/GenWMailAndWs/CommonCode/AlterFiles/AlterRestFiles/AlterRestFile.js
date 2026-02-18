const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

async function StartFunc({ inFolderPath, inPortNumber, inColumnsAsArray }) {
    try {
        const LocalRootPath = LocalFuncGetWorkSpaceFolder();
        const activeFileFolderPath = path.dirname(inFolderPath);
        const LocalRelativePath = activeFileFolderPath.replace(LocalRootPath, "");

        LocalFuncCreateFolder({ inFolderPath });

        const files = fs.readdirSync(inFolderPath);

        for (const file of files) {

            if (file === "routes.js" || file === "RestClients") {
                continue;
            }

            const filePath = path.join(inFolderPath, "RestClients", `${file.replace(".", "_")}.http`);

            let LocalLines = [];

            const resultObject = inColumnsAsArray.reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {});

            const jsonString = JSON.stringify(resultObject, null, 2);

            const relativeApiPath = LocalRelativePath.replaceAll(`\\`, "/");
            const tableName = file.split(".")[1];
            const apiPath = `${relativeApiPath}/Alter/${tableName}/{pk}`;
            const fullUrl = `http://localhost:${inPortNumber}${apiPath}`;

            LocalLines.push(`POST ${fullUrl}`);
            LocalLines.push("Content-Type: application/json");
            LocalLines.push("");
            LocalLines.push(jsonString);

            LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: filePath });
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

const LocalFuncCreateFolder = ({ inFolderPath }) => {
    try {
        const restClientsPath = path.join(inFolderPath, "RestClients");
        if (!fs.existsSync(restClientsPath)) {
            fs.mkdirSync(restClientsPath);
            console.log('Directory created successfully!');
        }
    } catch (err) {
        console.error('Error creating directory:', err);
    }
};

const LocalFuncGetWorkSpaceFolder = () => {
    if (vscode.workspace.workspaceFolders) {
        const rootUri = vscode.workspace.workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath;
        return rootPath;
    } else {
        console.log("No workspace folders found.");
    }
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    const content = inLinesArray.join('\n');
    fs.writeFileSync(inEditorPath, content, 'utf-8');
};

module.exports = { StartFunc };
