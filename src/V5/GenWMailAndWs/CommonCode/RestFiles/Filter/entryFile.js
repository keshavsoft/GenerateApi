const fs = require('fs');
// const { StartFunc: StartFuncFromRowFiler } = require('./RowFiler');
const { StartFunc: StartFuncFromByBody } = require('./ByBody');
const { StartFunc: StartFuncFromByKeyAndValue } = require('./ByKeyAndValue');
const { StartFunc: StartFuncFromBodyInArray } = require('./BodyInArray');
const { StartFunc: StartFuncFromBetWeen } = require('./Between');
const { StartFunc: StartFuncFromBetweenDates } = require('./BetweenDates');

const handlers = {
    "2_ByBody.http": StartFuncFromByBody,
    "3_ByKeyAndValue.http": StartFuncFromByKeyAndValue,
    "1_BodyInArray.http": StartFuncFromBodyInArray,
    "4_Between.http": StartFuncFromBetWeen,
    "5_BetweenDates.http": StartFuncFromBetweenDates
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
