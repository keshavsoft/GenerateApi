const { StartFunc: StartFuncFromRead } = require('./Read/entryFile');
const { StartFunc: StartFuncFromInsert } = require('./Insert/entryFile');
const { StartFunc: StartFuncFromAlter } = require('./Alter/entryFile');
const { StartFunc: StartFuncFromDelete } = require('./Delete/entryFile');

const StartFunc = async ({ inFolder, inTableName, inSubRoutes, inVersion, inPortNumber, inColumnsAsArray }) => {

    StartFuncFromRead({
        inFolder: `${inFolder}/Read/RestClients`,
        inTableName, inVersion, inPortNumber
    });
    StartFuncFromInsert({
        inFolder: `${inFolder}/Insert/RestClients`,
        inTableName, inVersion, inPortNumber, inColumnsAsArray
    });
    StartFuncFromAlter({
        inFolder: `${inFolder}/Alter/RestClients`,
        inTableName, inVersion, inPortNumber, inColumnsAsArray
    });
    StartFuncFromDelete({
        inFolder: `${inFolder}/Delete/RestClients`,
        inTableName, inVersion, inPortNumber, inColumnsAsArray
    });
};


module.exports = { StartFunc };