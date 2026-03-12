const fs = require("fs");
const path = require("path");
const vscode = require('vscode');
const { startFunc: buildHttpContent } = require('./buildHttpContent');

const StartFunc = ({ inToPathRoot, inCurrentPath, inPortNumber }) => {
    const method = LocaldetectMethod(inCurrentPath);
    const route = LocalbuildRoute({ inCurrentPath });

    const fileContent = buildHttpContent({
        method,
        route,
        inPortNumber,
        inCurrentPath,
        inToPathRoot
    });

    fs.writeFileSync(
        path.join(inCurrentPath, "restNew.http"),
        fileContent,
        "utf8"
    );
};

const LocaldetectMethod = (currentPath) => {
    const content = fs.readFileSync(path.join(currentPath, "routes.js"), "utf8");

    if (content.includes("router.get(")) return "GET";
    if (content.includes("router.post(")) return "POST";
    if (content.includes("router.put(")) return "PUT";
    if (content.includes("router.delete(")) return "DELETE";

    return "POST";
};

const getWorkSpaceFolder = () => {
    if (vscode.workspace.workspaceFolders) {
        const rootUri = vscode.workspace.workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath; // Get the file path
        return rootPath;
    } else {
        console.log("No workspace folders found.");
    };
};

const LocalbuildRoute = ({ inCurrentPath }) => {
    try {
        const presentPath = getWorkSpaceFolder();

        const parts = inCurrentPath.split(path.sep);
        const folder = parts[parts.length - 1];

        const routesFile = path.resolve(inCurrentPath, "..", "routes.js");
        const lines = fs.readFileSync(routesFile, "utf8").split(/\r?\n/);

        const match = lines.find(l => l.includes(`/${folder}/`));

        if (match) {
            const alias = match.split(" as ")[1]?.split("}")[0]?.replace("routerFrom", "");
            if (alias) parts[parts.length - 1] = alias;
        };

        let removedPath = parts.join("\\").replace(presentPath, "");
        const removedPathReplaced = removedPath.replaceAll("\\", "/");

        return removedPathReplaced;
    } catch (err) {
        console.error("Route build error:", err.message);
        return "";
    }
};

module.exports = { StartFunc };