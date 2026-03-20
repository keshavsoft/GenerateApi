import ParamsJson from "../../CommonFuncs/params.json" with { type: "json" };

import { readFile } from "./readFile.js";

const StartFunc = () => {
    let LocalReturnData = { KTF: false };
    const filePath = `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`;

    try {

        const data = readFile({ filePath });

        LocalReturnData.KTF = true;
        LocalReturnData.JsonData = data;
        return LocalReturnData;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { StartFunc };