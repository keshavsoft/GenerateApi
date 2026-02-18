const fs = require('fs');
const { StartFunc: StartFuncFromAsIs } = require('./AsIs');
const { StartFunc: StartFuncFromAsIsNoPk } = require('./AsIsNoPk');

const handlers = {
    "1_AsIs.http": StartFuncFromAsIs,
    "2.WithUuIdAndDT.http": StartFuncFromAsIsNoPk
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
