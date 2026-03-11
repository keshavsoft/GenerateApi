import ParamsJson from "../../CommonFuncs/params.json" with { type: "json" };

import { readFile } from "./readFile.js";
import { getNextPk } from "./getNextPk.js";
import { prepareInsert } from "./prepareInsert.js";
import { writeFile } from "./writeFile.js";

const StartFunc = ({ inRequestBody }) => {

    const filePath = `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`;

    try {

        const data = readFile({ filePath });

        const nextPk = getNextPk({ data });

        const updatedData = prepareInsert({
            data,
            inRequestBody,
            nextPk
        });

        writeFile({
            filePath,
            data: updatedData
        });

        return nextPk;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { StartFunc };