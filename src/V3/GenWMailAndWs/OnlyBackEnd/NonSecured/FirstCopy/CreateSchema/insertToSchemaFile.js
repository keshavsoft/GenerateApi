const fs = require("fs");
const { getJsonFiles } = require("./pullJsonFiles");

const StartFunc = ({ inToPath }) => {
    const LocalToPath = inToPath;
    const LocalFileNamesAsArray = getJsonFiles();
    // console.log("LocalFileNamesAsArray : ", LocalFileNamesAsArray);
    const LocalJsonToInsert = {};
    LocalJsonToInsert.Tables = LocalFileNamesAsArray;

    fs.writeFileSync(
        `${LocalToPath}/schema.json`,
        JSON.stringify(LocalJsonToInsert)
    );
};

module.exports = { StartFunc };