const fs = require('fs');
const { StartFunc: StartFuncFromAsIs } = require('./AsIs');
const { StartFunc: StartFuncFromRowDataWithPk } = require('./RowDataWithPk');
const { StartFunc: StartFuncFromSelColsAsArray } = require('./SelColsAsArray');
const { StartFunc: StartFuncFromSelColumns } = require('./SelColumns');
const { StartFunc: StartFuncFromSingleColumn } = require('./SingleColumn');
const { StartFunc: StartFuncFromSetSingleColumn } = require('./SetSingleColumn');
const { StartFunc: StartFuncFromKeyCount } = require('./KeyCount');
const { StartFunc: StartFuncFromMaxRow } = require('./MaxRow');

const handlers = {
    "1_AsIs.http": StartFuncFromAsIs,
    "2_RowDataWithPk.http": StartFuncFromRowDataWithPk,
    "3_SelColsAsArray.http": StartFuncFromSelColsAsArray,
    "4_SelColumns.http": StartFuncFromSelColumns,
    "5_SingleColumn.http": StartFuncFromSingleColumn,
    "6_SetSingleColumn.http": StartFuncFromSetSingleColumn,
    "7_KeyCount.http": StartFuncFromKeyCount,
    "8_MaxRow.http": StartFuncFromMaxRow

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
