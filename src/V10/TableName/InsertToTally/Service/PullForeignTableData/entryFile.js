import fs from "fs";
import ParamsJson from '../../../CommonFuncs/params.json' with { type: 'json' };

const StartFunc = ({ inPk }) => {
    const LocalFindRow = pullFindRow({ inPk });

    LocalFindRow.ForeignkeyTableData = pullForeignTableData({ inPk });

    return LocalFindRow;
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

export { StartFunc };