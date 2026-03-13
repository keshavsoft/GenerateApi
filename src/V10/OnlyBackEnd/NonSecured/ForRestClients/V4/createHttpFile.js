const fs = require("fs");
const path = require("path");
const vscode = require('vscode');
const { startFunc: buildHttpContent } = require('./buildHttpContent');
const { startFunc: buildRoute } = require('./buildRoute');

const StartFunc = ({ inToPathRoot, inCurrentPath, inPortNumber }) => {
    const method = LocaldetectMethod(inCurrentPath);
    const route = buildRoute({ inCurrentPath });

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

const LocalbuildRoute = ({ inCurrentPath }) => {
    try {
        const presentPath = getWorkSpaceFolder();

        const parts = inCurrentPath.split(path.sep);
        const folder = parts[parts.length - 1];

        // const folder = path.basename(inCurrentPath);

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

const getWorkSpaceFolder = () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) return "";

    return folders[0].uri.fsPath;
};

module.exports = { StartFunc };