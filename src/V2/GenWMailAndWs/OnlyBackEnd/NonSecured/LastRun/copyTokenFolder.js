const fse = require('fs-extra');
const path = require('path');

const StartFunc = async ({ inToPath }) => {
    const LocalToPath = inToPath;

    if (fse.existsSync(LocalToPath)) {
        // Further check if it's specifically a directory
        if (fse.lstatSync(LocalToPath).isDirectory()) {
            const LocalFromPath = path.join(__dirname, "..", "CopyCode", "Token");

            await fse.copy(LocalFromPath, `${LocalToPath}/Token`);
        } else {
            console.log(`'${LocalToPath}' exists but is not a directory (it's a file or other type).`);
        }
    } else {
        console.log(`The folder '${LocalToPath}' does not exist.`);
    };
};

module.exports = { StartFunc };
