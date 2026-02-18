const fs = require('fs');
const path = require('path');

const StartFunc = (inPath) => {
    const LocalFromForMethodTF = LocalFuncForMethodTF(inPath);

    if (LocalFromForMethodTF) {
        return "GET";
    } else {
        return "POST"
    };
};

const LocalFuncForMethodTF = (inPath) => {
    const LocalRoutePath = path.join(inPath, "Routes", "entryFile.js");
    const LocalSearchString = "router.get(";

    const linesArray = LocalFuncFileAsArray(LocalRoutePath);

    const LocalFindRow = linesArray.some(element => element.includes(LocalSearchString));

    return LocalFindRow;
};

const LocalFuncFileAsArray = (inFileName) => {

    const content = fs.readFileSync(inFileName, 'utf-8');
    const linesArray = content.split(/\r?\n/);

    return linesArray;
};

// StartFunc("V1");
module.exports = { StartFunc };