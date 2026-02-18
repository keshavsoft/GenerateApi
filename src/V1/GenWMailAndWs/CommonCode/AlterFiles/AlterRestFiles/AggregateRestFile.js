const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

async function StartFunc({ inFolderPath, inPortNumber }) {
    try {
        const workspaceRoot = getWorkspaceRoot();
        if (!workspaceRoot) {
            vscode.window.showErrorMessage("No workspace folder found.");
            return;
        }

        const activeFileFolderPath = path.dirname(inFolderPath);
        const relativePath = path.relative(workspaceRoot, activeFileFolderPath).replace(/\\/g, "/");

        createRestClientsFolder(inFolderPath);

        const files = fs.readdirSync(inFolderPath);

        for (const file of files) {
            if (file === "routes.js" || file === "RestClients") continue;

            const tableName = file.split(".")[1];
            if (!tableName) continue;

            const apiPath = tableName === "Count"
                ? `${relativePath}/AggregateFunctions/${tableName}`
                : `${relativePath}/AggregateFunctions/${tableName}/{ColumnName}`;

            const fullUrl = `http://localhost:${inPortNumber}/${apiPath}`;
            const httpFileName = `${file.replace(/\./g, "_")}.http`;
            const httpFilePath = path.join(inFolderPath, "RestClients", httpFileName);

            const httpContent = [`GET ${fullUrl}`];
            writeFile(httpFilePath, httpContent);
        }
    } catch (err) {
        console.error('❌ Error processing folder:', err);
        vscode.window.showErrorMessage(`Error: ${err.message}`);
    }
}

function createRestClientsFolder(folderPath) {
    const restClientsPath = path.join(folderPath, "RestClients");
    if (!fs.existsSync(restClientsPath)) {
        fs.mkdirSync(restClientsPath);
        console.log('📁 RestClients directory created.');
    }
}

function getWorkspaceRoot() {
    const folders = vscode.workspace.workspaceFolders;
    return folders && folders.length > 0 ? folders[0].uri.fsPath : null;
}

function writeFile(filePath, linesArray) {
    const content = linesArray.join('\n');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`📄 File written: ${filePath}`);
}

module.exports = { StartFunc };
