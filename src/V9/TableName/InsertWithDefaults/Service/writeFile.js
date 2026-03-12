import fs from "fs";

const writeFile = ({ filePath, data }) => {

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 2),
        "utf8"
    );
};

export { writeFile };