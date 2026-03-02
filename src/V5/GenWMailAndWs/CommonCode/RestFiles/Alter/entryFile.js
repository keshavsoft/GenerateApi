const fs = require('fs');
const { StartFunc: StartFuncFromWithPk } = require('./WithPk');
const { StartFunc: StartFuncFromColumnsWithPk } = require('./ColumnsWithPk');

const handlers = {
    "1_WithPk.http": StartFuncFromWithPk,
    "2_ColumnsWithPk.http": StartFuncFromColumnsWithPk
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
