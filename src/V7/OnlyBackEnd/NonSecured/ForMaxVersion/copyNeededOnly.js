const fse = require('fs-extra');
const path = require('path');

const StartFunc = async ({ inTableName, inSubRoutes, inToPath, inVersion, inPortNumber, inColumnsAsArray }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    let LocalFileDataAsArray = [];
    LocalFileDataAsArray.push("import express from 'express';");
    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("const router = express.Router();");
    LocalFileDataAsArray.push("");

    const LocalFromTablePath = path.join(__dirname, "..", "..", "..", "TableName");

    fse.copySync(LocalFromTablePath, `${LocalToPath}/${LocalVersion}/${LocalTableName}`);

    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("export { router };");

    fse.writeFileSync(`${LocalToPath}/${LocalVersion}/${LocalTableName}/routes.js`, LocalFileDataAsArray.join("\n"));
};

module.exports = { StartFunc };