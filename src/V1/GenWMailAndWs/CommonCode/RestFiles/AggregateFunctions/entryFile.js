const fs = require('fs');
const { StartFunc: StartFuncFromCount } = require('./Count');
const { StartFunc: StartFuncFromSum } = require('./Sum');
const { StartFunc: StartFuncFromMax } = require('./Max');
const { StartFunc: StartFuncFromMin } = require('./Min');
const { StartFunc: StartFuncFromAverage } = require('./Average');

const handlers = {
    "1_Count.http": StartFuncFromCount,
    "2_Sum.http": StartFuncFromSum,
    "3_Max.http": StartFuncFromMax,
    "4_Min.http": StartFuncFromMin,
    "5_Average.http": StartFuncFromAverage

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
