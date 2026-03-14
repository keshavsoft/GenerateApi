const fs = require("fs");
const path = require("path");
const vscode = require('vscode');

const StartFunc = ({ currentPath, inPortNumber }) => {
    const method = LocaldetectMethod(currentPath);
    const route = LocalbuildRoute(currentPath);

    const fileContent = LocalbuildHttpContent({
        method,
        route,
        inPortNumber,
        currentPath
    });

    fs.writeFileSync(
        path.join(currentPath, "restNew.http"),
        fileContent,
        "utf8"
    );
};

const LocalbuildHttpContent = ({ currentPath, method, route, inPortNumber }) => {
    const columnsJsonPath = path.join(currentPath, "..", "CommonFuncs", "params.json");
    const columnsData = fs.readFileSync(columnsJsonPath);

    const columnsDataAsJson = JSON.parse(columnsData);

    const columns = columnsDataAsJson.columns;

    const columnsAsArray = columns
        .filter(col => col?.isConsider === true)
        .map(col => col.field);

    const urlLine = `${method} http://localhost:${inPortNumber}${route}`;

    if (method === "GET") return urlLine;

    const body = LocalbuildBody(columnsAsArray);

    return `${urlLine}
Content-Type: application/json

${body}`;
};

const LocalbuildBody = (inColumnsAsArray) => {
    const obj = {};

    inColumnsAsArray.forEach(column => {
        obj[column] = "";
    });

    return JSON.stringify(obj, null, 4);
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

const LocalbuildRoute = (currentPath) => {
    try {
        const rootPath = getWorkSpaceFolder();

        const parts = currentPath.split(path.sep);
        const folder = parts[parts.length - 1];

        const routesFile = path.join(currentPath, "..", "routes.js");
        const lines = fs.readFileSync(routesFile, "utf8").split(/\r?\n/);

        const match = lines.find(l => l.includes(`/${folder}/`));

        if (match) {
            const alias = match.split(" as ")[1]?.split("}")[0]?.replace("routerFrom", "");
            if (alias) parts[parts.length - 1] = alias;
        }

        return parts.join("/").replace(rootPath, "");
    } catch (err) {
        console.error("Route build error:", err.message);
        return "";
    }
};

module.exports = { StartFunc };