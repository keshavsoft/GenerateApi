const fs = require('fs');
const readline = require('readline');
const CommonRouterSearch = "const StartFunc = ";
const CommonDeclareString = "let LocalinDataToInsert =";

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inVersion, inTaskName }) {
    const LocalVersion = inVersion;
    const LocalTaskName = inTaskName;

    const LocaFileName = `${inEditorPath}/${LocalVersion}/${inTableName}/${LocalTaskName}/KFs/insertToFile.js`;

    let LocalLines = await processLineByLine({ inFileName: LocaFileName });

    LocalFuncForDeclare({ inColumnsAsArray: inColumnsAsArray, inLines: LocalLines });
    LocalFuncForDeclareString({ inColumnsAsArray: inColumnsAsArray, inLines: LocalLines });

    LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: LocaFileName });
};

const LocalFuncForDeclare = ({ inColumnsAsArray, inLines }) => {
    let LocalLines = inLines;

    const LocalForInput = inColumnsAsArray.map(element => `LocalCoumn${element}`);

    const LocalColumnsToString = LocalForInput.join(",");

    let LocalFindIndex = LocalLines.findIndex((element) => element.includes(CommonRouterSearch));

    if (LocalFindIndex >= 0) {
        LocalLines[LocalFindIndex] = LocalLines[LocalFindIndex].replace("{}", `{${LocalColumnsToString}}`);
        LocalLines[LocalFindIndex] = LocalLines[LocalFindIndex].replace("{ }", `{${LocalColumnsToString}}`);
    };
};

const LocalFuncForDeclareString = ({ inColumnsAsArray, inLines }) => {
    let LocalLines = inLines;

    const LocalForObject = inColumnsAsArray.map(element => `${element} : LocalCoumn${element}`);

    let LocalFindDeclareIndex = LocalLines.findIndex((element) => element.includes(CommonDeclareString));

    if (LocalFindDeclareIndex >= 0) {
        LocalLines[LocalFindDeclareIndex] = LocalLines[LocalFindDeclareIndex].replace("{}", `{${LocalForObject}}`);
    };
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
