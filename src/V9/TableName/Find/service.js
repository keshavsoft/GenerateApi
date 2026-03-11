import fs from "fs";
import ParamsJson from '../CommonFuncs/params.json' with { type: 'json' };

const StartFunc = ({ inPk }) => {
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