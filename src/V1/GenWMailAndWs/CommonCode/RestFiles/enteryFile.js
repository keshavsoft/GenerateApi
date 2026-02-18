const { StartFunc: StartFuncFromRead } = require('./Read/entryFile');
const { StartFunc: StartFuncFromInsert } = require('./Insert/entryFile');
const { StartFunc: StartFuncFromAlter } = require('./Alter/entryFile');
const { StartFunc: StartFuncFromDelete } = require('./Delete/entryFile');
const { StartFunc: StartFuncFromFilter } = require('./Filter/entryFile');
const { StartFunc: StartFuncFromInsertWithChecks } = require('./InsertWithChecks/entryFile');
const { StartFunc: StartFuncFromReadSchema } = require('./ReadSchema/entryFile');
const { StartFunc: StartFuncFromGroupBy } = require('./GroupBy/entryFile');
const { StartFunc: StartFuncFromReadSingleCol } = require('./ReadSingleCol/entryFile');
const { StartFunc: StartFuncFromAggregateFunctions } = require('./AggregateFunctions/entryFile');
const { StartFunc: StartFuncFromAddWithDefault } = require('./AddWithDefault/entryFile');
const { StartFunc: StartFuncFromImport } = require('./Import/entryFile');
const { StartFunc: StartFuncFromSubTableOnArray } = require('./SubTableOnArray/entryFile');
const { StartFunc: StartFuncFromSubTableOnObj } = require('./SubTableOnObj/entryFile');
const { StartFunc: StartFuncFromSort } = require('./Sort/entryFile');
const { StartFunc: StartFuncFromAlterWithCheck } = require('./AlterWithCheck/entryFile');

const StartFunc = async ({ inFolder, inTableName, inSubRoutes, inVersion, inPortNumber, inColumnsAsArray }) => {

    for (const LoopSubRoute of inSubRoutes) {

        switch (LoopSubRoute) {
            case "Read":
                StartFuncFromRead({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber
                })
                break;
            case "Insert":
                StartFuncFromInsert({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "Alter":
                StartFuncFromAlter({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "Delete":
                StartFuncFromDelete({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "Filter":
                StartFuncFromFilter({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "InsertWithChecks":
                StartFuncFromInsertWithChecks({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "ReadSchema":
                StartFuncFromReadSchema({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "GroupBy":
                StartFuncFromGroupBy({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "ReadSingleCol":
                StartFuncFromReadSingleCol({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "AggregateFunctions":
                StartFuncFromAggregateFunctions({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "AddWithDefault":
                StartFuncFromAddWithDefault({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "Import":
                StartFuncFromImport({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "SubTableOnArray":
                StartFuncFromSubTableOnArray({
                    inFolder: `${inFolder}/${LoopSubRoute}`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
            case "SubTableOnObj":
                StartFuncFromSubTableOnObj({
                    inFolder: `${inFolder}/${LoopSubRoute}`,
                    inTableName, inVersion, inPortNumber, inColumnsAsArray
                })
                break;
                case "Sort":
                StartFuncFromSort({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber
                })
                break;
                case "AlterWithCheck":
                StartFuncFromAlterWithCheck({
                    inFolder: `${inFolder}/${LoopSubRoute}/RestClients`,
                    inTableName, inVersion, inPortNumber,inColumnsAsArray
                })
                break;

            default:
                break;
        }
    };

};

module.exports = { StartFunc };