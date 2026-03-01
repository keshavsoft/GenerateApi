const fs = require('fs');
const path = require('path');

const { StartFunc: StartFuncFromForMethod } = require("./forMethod");

const StartFunc = (rootPath, inPath, inVersion, inPortNumber) => {
    const fullPath = path.join(inPath, "restNew.http");

    const LocalStringToInsert = LocalFuncForStringToInsert(rootPath, inPath);
    const LocalForMethod = StartFuncFromForMethod(inPath);

    fs.writeFileSync(fullPath, `${LocalForMethod} http://localhost:${inPortNumber}${LocalStringToInsert}`, 'utf8');
};

const LocalFuncForStringToInsert = (rootPath, inPath) => {
    const updatedPath = inPath.replace(/\\/g, "/");
    const k2 = updatedPath.replace(rootPath, "");
    return k2;
};

module.exports = { StartFunc };