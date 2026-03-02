const { StartFunc: StartFuncFromForInsert } = require("./ForInsert/entryFile");

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inPortNumber, inVersion }) {
    const LocalVersion = inVersion;

    await StartFuncFromForInsert({
        inEditorPath, inTableName, inColumnsAsArray, inPortNumber,
        inVersion: LocalVersion
    });
};

module.exports = { StartFunc };
