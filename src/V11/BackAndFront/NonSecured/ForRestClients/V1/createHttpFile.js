const fs = require("fs");
const path = require("path");

const StartFunc = ({ rootPath, currentPath, inPortNumber, inColumnsAsArray }) => {
    const method = LocaldetectMethod(currentPath);
    const route = LocalbuildRoute(rootPath, currentPath);

    fs.writeFileSync(
        path.join(currentPath, "restNew.http"),
        `${method} http://localhost:${inPortNumber}${route}`,
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
        };

        return parts.join("/").replace(rootPath, "");
    } catch (err) {
        console.error("Route build error:", err.message);
        return "";
    }
};

module.exports = { StartFunc };