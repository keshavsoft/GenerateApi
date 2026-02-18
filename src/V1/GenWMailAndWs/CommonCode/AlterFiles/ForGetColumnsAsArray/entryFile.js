const { StartFunc: StartFuncFromAlterRestFiles } = require("./alterRestFiles");
const CommonTaskName = "getColumnsAsArray";

async function StartFunc({ inEditorPath, inTableName, inPortNumber, inVersion }) {
    const LocalVersion = inVersion;

    await StartFuncFromAlterRestFiles({
        inFilePath: `${inEditorPath}/${LocalVersion}/${inTableName}/RestClients/${CommonTaskName}.http`,
        inPortNumber
    });
};

module.exports = { StartFunc };
