const fs = require('fs');
const { StartFunc: StartFuncFromAscending } = require('./Ascending');
const { StartFunc: StartFuncFromDescending } = require('./Descending');

const handlers = {
    "1_Ascending.http": StartFuncFromAscending,
    "2_Descending.http": StartFuncFromDescending
};

async function StartFunc({ inFolder, inTableName, inVersion, inPortNumber }) {
    const files = fs.readdirSync(inFolder);

    files.forEach(file => {
        const handler = handlers[file];
        if (handler) {
            handler({
                inFilePath: `${inFolder}/${file}`,
                inTableName, inVersion, inPortNumber
            });
        }
    });
}

module.exports = { StartFunc };
