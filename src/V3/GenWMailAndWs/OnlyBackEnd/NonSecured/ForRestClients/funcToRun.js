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
    const LocalPathToArray = inPath.split("\\");
    const LocalPathLastRoute = LocalPathToArray[LocalPathToArray.length - 1];

    const LocalRoutePath = path.join(inPath, "..", "routes.js");
    const LocalSearchString = `/${LocalPathLastRoute}/`;

    const linesArray = LocalFuncFileAsArray(LocalRoutePath);

    const LocalFindRow = linesArray.find(element => element.includes(LocalSearchString));
    const LocalFindRowArray = LocalFindRow.split("}")[0].split(" as ")[1].replace("routerFrom", "");

    LocalPathToArray[LocalPathToArray.length - 1] = LocalFindRowArray;
    const LocalStringToInsert = LocalPathToArray.join("/").replace(rootPath, "");

    return LocalStringToInsert;
};

const LocalFuncFileAsArray = (inFileName) => {

    const content = fs.readFileSync(inFileName, 'utf-8');
    const linesArray = content.split(/\r?\n/);

    return linesArray;
};

// StartFunc("V1");
module.exports = { StartFunc };