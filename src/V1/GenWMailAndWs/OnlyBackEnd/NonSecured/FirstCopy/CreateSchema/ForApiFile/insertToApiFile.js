const fs = require("fs");
const { getJsonFiles } = require("./pullApiFiles");

const StartFunc = ({ inToPath }) => {
    const LocalToPath = inToPath;
    const LocalFileNamesAsArray = getJsonFiles();
    // console.log("LocalFileNamesAsArray : ", LocalFileNamesAsArray);
    const LocalJsonToInsert = {};
    LocalJsonToInsert.Tables = LocalFileNamesAsArray;

    fs.writeFileSync(
        `${LocalToPath}/api.json`,
        JSON.stringify(LocalJsonToInsert)
    );
};

module.exports = { StartFunc };