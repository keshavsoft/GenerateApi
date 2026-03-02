const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const readline = require('readline');

async function StartFunc({ inFolderPath, inPortNumber }) {
    try {
        const LocalRootPath = LocalFuncGetWorkSpaceFolder();
        const activeFileFolderPath = path.dirname(inFolderPath);
        const LocalRelativePath = activeFileFolderPath.replace(LocalRootPath, "");
        const relativeApiPath = LocalRelativePath.replaceAll(`\\`, "/");

        LocalFuncCreateFolder({ inFolderPath });

        const files = fs.readdirSync(inFolderPath);

        for (const file of files) {
            if (file === "routes.js" || file === "RestClients") {
                continue;
            };

            const fileParts = file.split(".");
            if (fileParts.length < 2) continue;

            const tableName = fileParts[1];
            const filePath = path.join(inFolderPath, "RestClients", `${file.replace(".", "_")}.http`);

            // const stats = await fs.lstatSync(filePath);
// fs.existsSync()
            if (fs.existsSync(filePath)) {
                let LocalLines = await processLineByLine({ inFileName: filePath });
                LocalLines[0] = LocalLines[0].replace("{PORT}", inPortNumber);
                LocalLines[0] = LocalLines[0].replace("{SubRoute}", LocalRelativePath.replaceAll(`\\`, "/"));

                LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: filePath });

                continue;
            };

            const apiPath = `${relativeApiPath}/GroupBy/${tableName}`;
            const fullUrl = `http://localhost:${inPortNumber}${apiPath}`;
            let LocalLines = [];

            LocalLines.push(`POST ${fullUrl}`);
            LocalLines.push("Content-Type: application/json");
            LocalLines.push("");
            LocalLines.push("[");
            LocalLines.push("\t{ColumnsName}");
            LocalLines.push("]");

            LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: filePath });
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
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

const LocalFuncCreateFolder = ({ inFolderPath }) => {
    const restClientsPath = path.join(inFolderPath, "RestClients");

    if (!fs.existsSync(restClientsPath)) {
        fs.mkdirSync(restClientsPath);
        // console.log('Directory created successfully!');
    }
};

const LocalFuncGetWorkSpaceFolder = () => {
    if (vscode.workspace.workspaceFolders) {
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    } else {
        console.log("No workspace folders found.");
        return "";
    }
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    const content = inLinesArray.join('\n');
    fs.writeFileSync(inEditorPath, content, 'utf-8');
};

const LocalFuncForColumns = ({ inColumnsAsArray }) => {
    const resultObject = inColumnsAsArray.reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {});

    const jsonString = JSON.stringify(resultObject, null, 2);
};

module.exports = { StartFunc };
