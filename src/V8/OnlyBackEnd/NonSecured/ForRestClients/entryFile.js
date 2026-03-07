const fs = require("fs");
const path = require("path");

const CommoTargetFile = "controller.js";

const StartFunc = (rootPath, currentPath, inVersion, inPortNumber, inColumnsAsArray, tableName,) => {
    let entries;

    try {
        entries = fs.readdirSync(currentPath, { withFileTypes: true });
    } catch (error) {
        return;
    };

    if (entries.some(e => e.name === CommoTargetFile)) {
        const CurrentTableNameName = currentPath.split("\\")[7];
        if (CurrentTableNameName == tableName) {
            LocalCreateHttpFile(rootPath, currentPath, inPortNumber, inColumnsAsArray, tableName);
        }
    };

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const fullPath = path.join(currentPath, entry.name);

        StartFunc(rootPath, fullPath, inVersion, inPortNumber, inColumnsAsArray, tableName);
    };
};

const LocalCreateHttpFile = (rootPath, currentPath, inPortNumber, inColumnsAsArray) => {
    const method = LocaldetectMethod(currentPath);
    const route = LocalbuildRoute(rootPath, currentPath);

    let body = "";

    if ((method === "POST" || method === "PUT") && Array.isArray(inColumnsAsArray)) {
        const jsonBody = inColumnsAsArray
            .map(key => `  "${key}": ""`)
            .join(",\n");

        body = `
Content-Type: application/json

{
${jsonBody}
}`;
    }

    fs.writeFileSync(
        path.join(currentPath, "restNew.http"),
        `${method} http://localhost:${inPortNumber}${route}${body}`,
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

const LocalbuildRoute = (rootPath, currentPath) => {
    try {
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