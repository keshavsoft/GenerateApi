const fse = require("fs-extra");
const baseParams = require("./params.json");

const StartFunc = ({ inTableName, inToPath, inVersion }) => {
    try {
        const filePath = `${inToPath}/${inVersion}/${inTableName}/CommonFuncs/params.json`;

        const data = {
            ...baseParams,
            TableName: inTableName
        };

        console.log("Writing params.json", filePath);

        fse.outputFileSync(filePath, JSON.stringify(data, null, 2));

        console.log("params.json written successfully");
    } catch (error) {
        console.log("❌ Failed to write params.json", error.message);
        throw error;
    }
};

module.exports = { StartFunc };
