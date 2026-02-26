const fs = require('fs');
const { StartFunc: StartFuncFromAsIs } = require('./AsIs');
const { StartFunc: StartFuncFromAsIsNoPk } = require('./AsIsNoPk');
const { StartFunc: StartFuncFromAsIsAndTS } = require('./AsIsAndTS');
const { StartFunc: StartFuncFromColumnExist } = require('./ColumnExist');
const { StartFunc: StartFuncFromSchemaColumnsOnly } = require('./SchemaColumnsOnly');
const { StartFunc: StartFuncFromDefault } = require('./Default');
const { StartFunc: StartFuncFromOnlyDefault } = require('./OnlyDefault');
const { StartFunc: StartFuncFromPkReturn } = require('./PkReturn');

const handlers = {
    "1_AsIs.http": StartFuncFromAsIs,
    "2_AsIsNoPk.http": StartFuncFromAsIsNoPk,
    "3_AsIsAndTS.http": StartFuncFromAsIsAndTS,
    "4_ColumnExist.http": StartFuncFromColumnExist,
    "5_SchemaColumnsOnly.http": StartFuncFromSchemaColumnsOnly,
    "7_Default.http": StartFuncFromDefault,
    "8_OnlyDefault.http": StartFuncFromOnlyDefault,
    "9_PkReturn.http": StartFuncFromPkReturn
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
