const fse = require("fs-extra");
const CommonFolderName = "Schemas";
const path = require("path");

const StartFunc = ({ inToPath }) => {
    const LocalToPath = inToPath;

    fse.mkdirSync(`${LocalToPath}/${CommonFolderName}`);

    fse.copySync(
        path.join(__dirname, "JsonFiles"),
        `${LocalToPath}/${CommonFolderName}`
    );
};

module.exports = { StartFunc };