const fs = require('fs');
const { StartFunc: StartFuncFromAsIs } = require('./AsIs');
const { StartFunc: StartFuncFromRowDataWithPk } = require('./RowDataWithPk');
const { StartFunc: StartFuncFromSelColsAsArray } = require('./SelColsAsArray');
const { StartFunc: StartFuncFromSelColumns } = require('./SelColumns');

const handlers = {
    "1_AsIs.http": StartFuncFromAsIs,
    "2_Both.http": StartFuncFromRowDataWithPk,
    "3_FieldsOnly.http": StartFuncFromSelColsAsArray,
    "4_TitlesOnly.http": StartFuncFromSelColumns,
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
