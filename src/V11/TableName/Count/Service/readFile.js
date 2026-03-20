import fs from "fs";

const readFile = ({ filePath }) => {

    const fileData = fs.readFileSync(filePath, "utf8");

    return JSON.parse(fileData);
};

export { readFile };