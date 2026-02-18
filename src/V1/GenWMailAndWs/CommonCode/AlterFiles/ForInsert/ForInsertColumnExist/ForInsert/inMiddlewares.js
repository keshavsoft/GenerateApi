const fs = require('fs');
const readline = require('readline');

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inVersion, inTaskName }) {
    const LocalVersion = inVersion;

    const LocaFileName = `${inEditorPath}/${LocalVersion}/${inTableName}/${inTaskName}/Middlewares/entryFile.js`;

    const LocalForInput = inColumnsAsArray.map(element => `"${element}"`);

    const LocalColumnsToString = LocalForInput.join(",");

    let LocalLines = await processLineByLine({ inFileName: LocaFileName });

    LocalLines[0] = LocalLines[0].replace("[]", `[${LocalColumnsToString}]`);

    LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: LocaFileName });
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    fs.writeFileSync(inEditorPath, content, 'utf-8');
};

const processLineByLine = async ({ inFileName }) => {
    try {
        const fileStream = fs.createReadStream(inFileName);
        let LocalLines = [];

        fileStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            LocalLines.push(line);
        };

        return LocalLines;
    } catch (err) {
        console.error(`Error processing file: ${err.message}`);
    }
};

module.exports = { StartFunc };
