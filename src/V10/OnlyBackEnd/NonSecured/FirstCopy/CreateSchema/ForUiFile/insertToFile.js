const fs = require("fs");
const { getJsonFiles } = require("./pullApiFiles");
const CommonFileName = "ui.json";

const StartFunc = ({ inToPath }) => {
    const LocalToPath = inToPath;
    const LocalFileNamesAsArray = getJsonFiles();
    // console.log("LocalFileNamesAsArray : ", LocalFileNamesAsArray);
    const LocalJsonToInsert = {};
    LocalJsonToInsert.Tables = LocalFileNamesAsArray;

    fs.writeFileSync(
        `${LocalToPath}/${CommonFileName}`,
        JSON.stringify(LocalJsonToInsert)
    );
};

module.exports = { StartFunc };