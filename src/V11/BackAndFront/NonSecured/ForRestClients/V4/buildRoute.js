const fs = require("fs");
const path = require("path");
const vscode = require('vscode');

const startFunc = ({ inCurrentPath }) => {
    try {
        const workspacePath = getWorkSpaceFolder();

        const folder = getFolderName(inCurrentPath);

        const alias = getAliasFromRoutes({
            inCurrentPath,
            folder
        });

        const route = buildRoutePath({
            inCurrentPath,
            workspacePath,
            folderAlias: alias
        });

        return route;

    } catch (err) {
        console.error("Route build error:", err.message);
        return "";
    }
};

const buildRoutePath = ({ inCurrentPath, workspacePath, folderAlias }) => {
    const parts = inCurrentPath.split(path.sep);

    if (folderAlias) {
        parts[parts.length - 1] = folderAlias;
    }

    const removedPath = parts.join("\\").replace(workspacePath, "");

    return removedPath.replaceAll("\\", "/");
};

const getAliasFromRoutes = ({ inCurrentPath, folder }) => {
    const routesFile = path.resolve(inCurrentPath, "..", "routes.js");

    if (!fs.existsSync(routesFile)) return "";

    const lines = fs.readFileSync(routesFile, "utf8").split(/\r?\n/);

    const match = lines.find(line => line.includes(`/${folder}/`));

    if (!match) return "";

    return match
        .split(" as ")[1]
        ?.split("}")[0]
        ?.replace("routerFrom", "") || "";
};

const getFolderName = (inCurrentPath) => {
    const parts = inCurrentPath.split(path.sep);
    return parts[parts.length - 1];
};

const getWorkSpaceFolder = () => {
    const folders = vscode.workspace.workspaceFolders;

    if (!folders || folders.length === 0) {
        console.log("No workspace folders found.");
        return "";
    }

    return folders[0].uri.fsPath;
};

module.exports = { startFunc };