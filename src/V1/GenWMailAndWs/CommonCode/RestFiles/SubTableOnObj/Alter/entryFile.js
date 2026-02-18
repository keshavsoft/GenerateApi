const fs = require('fs');
const { StartFunc: StartFuncFromWithPk } = require('./WithPk');

const handlers = {
    "1_WithPk.http": StartFuncFromWithPk
};

async function StartFunc({ inFolder, inTableName, inVersion, inPortNumber, inColumnsAsArray }) {
    const files = fs.readdirSync(inFolder);

    files.forEach(file => {
        const handler = handlers[file];
        if (handler) {
            handler({
                inFilePath: `${inFolder}/${file}`,
                inTableName, inVersion, inPortNumber, inColumnsAsArray
            });
        }
    });
}

module.exports = { StartFunc };
