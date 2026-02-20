const fse = require("fs-extra");
const path = require("path");

const StartFunc = async ({
    inTableName,
    inToPath,
    inVersion,
}) => {
    try {
        const targetDir = `${inToPath}/${inVersion}/${inTableName}`;
        const sourceDir = path.join(__dirname, "..", "..", "..", "TableName");

        console.log("Copying table template", { sourceDir, targetDir });

        // 1️⃣ Copy base table folder
        fse.copySync(sourceDir, targetDir);

        // 2️⃣ Create routes.js content
        const routesContent = [
            "import express from 'express';",
            "",
            "const router = express.Router();",
            "",
            "export { router };"
        ].join("\n");

        const routesPath = `${targetDir}/routes.js`;
        fse.writeFileSync(routesPath, routesContent);

        console.log("routes.js created", routesPath);
    } catch (error) {
        console.log("❌ Error while copying route", error.message);
        throw error;
    }
};

module.exports = { StartFunc };
