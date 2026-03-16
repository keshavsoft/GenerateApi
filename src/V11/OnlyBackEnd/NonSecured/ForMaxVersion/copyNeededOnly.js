const fse = require('fs-extra');
const path = require('path');

const StartFunc = async ({ inTableName, inSubRoutes, inToPath, inVersion }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    const LocalFromTablePath = path.join(__dirname, "..", "..", "..", "TableName");
    const LocalToBasePath = `${LocalToPath}/${LocalVersion}/${LocalTableName}`;

    // fse.copySync(LocalFromTablePath, `${LocalToPath}/${LocalVersion}/${LocalTableName}`);

    for (const folderName of inSubRoutes) {
        const sourcePath = path.join(LocalFromTablePath, folderName);
        const destPath = path.join(LocalToBasePath, folderName);

        fse.copySync(sourcePath, destPath);
    };
};

const StartFunc1 = async ({ inTableName, inSubRoutes, inToPath, inVersion }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    let LocalFileDataAsArray = [];
    LocalFileDataAsArray.push("import express from 'express';");
    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("const router = express.Router();");
    LocalFileDataAsArray.push("");

    const LocalFromTablePath = path.join(__dirname, "..", "..", "..", "TableName");
    const LocalToBasePath = `${LocalToPath}/${LocalVersion}/${LocalTableName}`;

    // fse.copySync(LocalFromTablePath, `${LocalToPath}/${LocalVersion}/${LocalTableName}`);

    for (const folderName of inSubRoutes) {
        const sourcePath = path.join(LocalFromTablePath, folderName);
        const destPath = path.join(LocalToBasePath, folderName);

        fse.copySync(sourcePath, destPath);
    };

    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("export { router };");

    fse.writeFileSync(`${LocalToPath}/${LocalVersion}/${LocalTableName}/routes.js`, LocalFileDataAsArray.join("\n"));
};

module.exports = { StartFunc };