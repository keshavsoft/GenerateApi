const fs = require('fs');
const path = require('path');

function getJsonFiles() {
    const LocalFolderPath = path.join(__dirname, "JsonFiles");

    const files = fs.readdirSync(LocalFolderPath);
    const jsonFiles = [];

    files.forEach(file => {
        const filePath = path.join(LocalFolderPath, file);
        const fileStat = fs.statSync(filePath);
        // console.log("file : ", file);

        if (fileStat.isFile() && path.extname(file) === '.json' && file !== "schema.json") {
            jsonFiles.push(path.parse(file).name);
        };
    });

    return jsonFiles;
}

module.exports = { getJsonFiles };