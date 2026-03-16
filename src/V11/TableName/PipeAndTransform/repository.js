import fs from "fs";
import { pipeline } from "stream/promises";
import { StorageError } from "./errors.js";

const StartFunc = async (readable, path) => {
    try {
        const file = fs.createWriteStream(path);

        await pipeline(readable, file);   // waits full write

        return true;
    } catch (err) {
        throw new StorageError(`Failed writing to ${path}`);
    }
};

export { StartFunc };