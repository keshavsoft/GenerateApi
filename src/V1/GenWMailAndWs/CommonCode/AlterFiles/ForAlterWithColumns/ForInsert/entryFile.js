// const { StartFunc: StartFuncFromAlterRestFiles } = require("./alterRestFiles");
const { StartFunc: StartFuncFromMiddlewares } = require("./inMiddlewares");
const CommonTaskName = "Alter/2.ColumnsWithPk";

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inPortNumber, inVersion }) {
    const LocalVersion = inVersion;

    // await StartFuncFromAlterRestFiles({
    //     inFilePath: `${inEditorPath}/${LocalVersion}/${inTableName}/Alter/RestClients/AlterInColumnsWithPk.http`,
    //     inTableName, inPortNumber, inColumnsAsArray
    // });

    await StartFuncFromMiddlewares({
        inEditorPath, inTableName, inColumnsAsArray,
        inVersion: LocalVersion, inTaskName: CommonTaskName
    });
};

module.exports = { StartFunc };
