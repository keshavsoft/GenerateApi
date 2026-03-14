import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ParamsJson from '../../../../CommonFuncs/params.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startFunc = ({ inPk }) => {
    let LocalCustomerData = pullFindRow({ inPk });
    let LocalItemsData = pullForeignTableData({ inPk });

    return {
        customerDetails: LocalCustomerData,
        allinventoryentries: LocalItemsData
    };
};

const pullForeignTableData = ({ inPk }) => {
    const targetPath = `./${ParamsJson.DataPath}/${ParamsJson.ForeignkeyTables[0]}.json`;

    try {
        const LocalFileData = fs.readFileSync(targetPath);
        const LocalFileDataAsJson = JSON.parse(LocalFileData);

        const filteredRows = LocalFileDataAsJson.filter(element => element.ParentPk === inPk);

        return filteredRows;
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};

const pullFindRow = ({ inPk }) => {
    const targetPath = `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`;

    try {
        const LocalFileData = fs.readFileSync(targetPath);
        const LocalFileDataAsJson = JSON.parse(LocalFileData);

        const LocalFindRow = LocalFileDataAsJson.find(element => element.pk === parseInt(inPk));

        return LocalFindRow;
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};


export { startFunc };