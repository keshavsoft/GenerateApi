import fs from "fs";
import ParamsJson from '../CommonFuncs/params.json' with { type: 'json' };

const StartFunc = () => {
    const targetPath = `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`;

    try {
        const LocalFileData = fs.readFileSync(targetPath);
        const LocalFileDataAsJson = JSON.parse(LocalFileData);

        return LocalFileDataAsJson;
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};

export { StartFunc };