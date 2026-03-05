import ParamsJson from '../CommonFuncs/params.json' with { type: 'json' };
import { StartFunc as saveIncomingStream } from "./repository.js";
import { ConflictError } from "./errors.js";

const StartFunc = async ({ inputStream }) => {
    const targetPath = `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`;

    // Example business rule (optional but realistic)
    // Prevent overwrite while another import is running
    if (globalThis.__IMPORT_RUNNING__)
        throw new ConflictError("Import already running");

    globalThis.__IMPORT_RUNNING__ = true;

    try {
        await saveIncomingStream(inputStream, targetPath);
        return "stored";
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};

export { StartFunc };