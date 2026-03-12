const fs = require('fs');
const { StartFunc: StartFuncFromForUnique } = require('./ForUnique');
const { StartFunc: StartFuncFromForForPkReturn } = require('./ForPkReturn');

const handlers = {
    "1_ForUnique.http": StartFuncFromForUnique,
    "3_PkReturn.http": StartFuncFromForForPkReturn
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
