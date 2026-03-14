import fs from "fs";
import { pipeline } from "stream/promises";

const saveIncomingStream = async (readable, path) => {
    const file = fs.createWriteStream(path);
    await pipeline(readable, file);
};

export { saveIncomingStream };