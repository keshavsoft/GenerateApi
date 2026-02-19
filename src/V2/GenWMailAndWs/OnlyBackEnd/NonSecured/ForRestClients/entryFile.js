const fs = require('fs');
const path = require('path');
const { StartFunc: StartFuncFromFuncToRun } = require("./funcToRun");

// 👉 Configure these
const TARGET_FOLDER_NAME = "Controllers";

const StartFunc = (rootPath, currentPath, inVersion, inPortNumber) => {
    let entries;

    try {
        entries = fs.readdirSync(currentPath, { withFileTypes: true });
    } catch (err) {
        console.error("Cannot read:", currentPath, err.message);
        return;
    };

    const LocalNamesOnly = entries.map(entry => entry.name);

    if (LocalNamesOnly.includes(TARGET_FOLDER_NAME)) {
        StartFuncFromFuncToRun(rootPath, currentPath, inVersion, inPortNumber)
    };

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const fullPath = path.join(currentPath, entry.name);

        StartFunc(rootPath, fullPath, inVersion, inPortNumber);
    };
};

// StartFunc("V1");
module.exports = { StartFunc };