const fs = require('fs');
const { StartFunc: StartFuncFromSingleColumn } = require('./SingleColumn');
const { StartFunc: StartFuncFromSingleColLength } = require('./SingleColLength');
const { StartFunc: StartFuncFromSetSingleColumn } = require('./SetSingleColumn');
const { StartFunc: StartFuncFromSum } = require('./Sum');
const { StartFunc: StartFuncFromSingleColumnSum } = require('./SingleColumnSum');

const handlers = {
    "1_SingleColumn.http": StartFuncFromSingleColumn,
    "2_SingleColLength.http": StartFuncFromSingleColLength,
    "3_SetSingleColumn.http": StartFuncFromSetSingleColumn,
    "4_Sum.http": StartFuncFromSum,
    "5_SingleColumnSum.http": StartFuncFromSingleColumnSum
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
