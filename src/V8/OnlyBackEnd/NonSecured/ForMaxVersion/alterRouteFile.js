const fse = require('fs-extra');

const StartFunc = ({ inTableName, inSubRoutes, inToPath, inVersion }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    let LocalFileDataAsArray = [];
    LocalFileDataAsArray.push("import express from 'express';");
    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("const router = express.Router();");
    LocalFileDataAsArray.push("");

    const LocalLinesFromSubArray = LocalFuncForRoutesFile({ inSubRoutes });

    LocalFileDataAsArray = [...LocalFileDataAsArray, ...LocalLinesFromSubArray];

    LocalFileDataAsArray.push("");
    LocalFileDataAsArray.push("export { router };");

    fse.writeFileSync(`${LocalToPath}/${LocalVersion}/${LocalTableName}/routes.js`, LocalFileDataAsArray.join("\n"));
};


const LocalFuncForRoutesFile = ({ inSubRoutes }) => {
    let LocalFileDataAsArray = [];

    for (const LoopSubRoute of inSubRoutes) {
        LocalFileDataAsArray.push(`import { router as routerFrom${LoopSubRoute} } from "./${LoopSubRoute}/routes.js"`);
    };

    LocalFileDataAsArray.push("");

    for (const LoopSubRoute of inSubRoutes) {
        LocalFileDataAsArray.push(`router.use("/${LoopSubRoute}", routerFrom${LoopSubRoute});`);
    };

    return LocalFileDataAsArray;
};


module.exports = { StartFunc };