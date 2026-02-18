const fs = require('fs');
const readline = require('readline');
const CommonRouterSearch = "let LocalFromLowDb = ";
const CommonDeclareString = "let postDefaultFunc = ";

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inVersion, inTaskName }) {
    const LocalVersion = inVersion;
    const LocalTaskName = inTaskName;

    const LocaFileName = `${inEditorPath}/${LocalVersion}/${inTableName}/${LocalTaskName}/Dals/entryFile.js`;

    const LocalForInput = inColumnsAsArray.map(element => `LocalCoumn${element}`);

    const LocalColumnsToString = LocalForInput.join(",");

    let LocalLines = await processLineByLine({ inFileName: LocaFileName });

    let LocalFindIndex = LocalLines.findIndex((element) => element.includes(CommonRouterSearch));

    if (LocalFindIndex >= 0) {
        LocalLines[LocalFindIndex] = LocalLines[LocalFindIndex].replace("{}", `{${LocalColumnsToString}}`);
    };

    let LocalFindDeclareIndex = LocalLines.findIndex((element) => element.includes(CommonDeclareString));

    if (LocalFindDeclareIndex >= 0) {
        LocalLines[LocalFindDeclareIndex] = LocalLines[LocalFindDeclareIndex].replace("{}", `{${LocalColumnsToString}}`);
    };

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
