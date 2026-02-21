const fse = require("fs-extra");


const StartFunc = ({ inTableName, inSubRoutes, inToPath, inVersion }) => {
    try {
        const routesPath = `${inToPath}/${inVersion}/${inTableName}/routes.js`;
        console.log("Generating routes.js", routesPath);

        const content = buildRoutesFile(inSubRoutes);
        fse.writeFileSync(routesPath, content);

        console.log("routes.js written successfully");
    } catch (error) {
        console.log("❌ Error writing routes.js", error.message);
        throw error;
    }
};

/* ---------- HELPERS ---------- */

const buildRoutesFile = (subRoutes = []) => {
    return [
        "import express from 'express';",
        "",
        "const router = express.Router();",
        "",
        ...buildSubRouteImports(subRoutes),
        "",
        ...buildSubRouteUses(subRoutes),
        "",
        "export { router };"
    ].join("\n");
};

const buildSubRouteImports = (subRoutes) =>
    subRoutes.map(
        r => `import { router as routerFrom${r} } from "./${r}/routes.js";`
    );

const buildSubRouteUses = (subRoutes) =>
    subRoutes.map(
        r => `router.use("/${r}", routerFrom${r});`
    );

module.exports = { StartFunc };
