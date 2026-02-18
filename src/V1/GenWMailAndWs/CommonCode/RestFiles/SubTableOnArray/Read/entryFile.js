const fs = require('fs');
const { StartFunc: StartFuncFromAsIs } = require('./AsIs');

const handlers = {
    "1_AsIs.http": StartFuncFromAsIs

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
