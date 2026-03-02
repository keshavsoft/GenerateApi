const { StartFunc: StartFuncFromInControllers } = require("./inControllers");
const { StartFunc: StartFuncFromInRepos } = require("./inRepos");
const { StartFunc: StartFuncFromInDals } = require("./inDals");
const { StartFunc: StartFuncFromInKF } = require("./inKF");
const { StartFunc: StartFuncFromAlterRestFiles } = require("./alterRestFiles");
const { StartFunc: StartFuncFromMiddlewares } = require("./inMiddlewares");

const CommonTaskName = "Validate/AsIs";

async function StartFunc({ inEditorPath, inTableName, inColumnsAsArray, inPortNumber, inVersion }) {
    const LocalVersion = inVersion;

    await StartFuncFromInControllers({
        inEditorPath, inTableName, inColumnsAsArray, inVersion: LocalVersion,
        inTaskName: CommonTaskName
    });

    await StartFuncFromInRepos({
        inEditorPath, inTableName, inColumnsAsArray, inVersion: LocalVersion,
        inTaskName: CommonTaskName
    });

    await StartFuncFromInDals({
        inEditorPath, inTableName, inColumnsAsArray, inVersion: LocalVersion,
        inTaskName: CommonTaskName
    });

    await StartFuncFromInKF({
        inEditorPath, inTableName, inColumnsAsArray, inVersion: LocalVersion,
        inTaskName: CommonTaskName
    });

    await StartFuncFromAlterRestFiles({
        inFilePath: `${inEditorPath}/${LocalVersion}/${inTableName}/AsIs.http`,
        inTableName, inPortNumber, inColumnsAsArray
    });

    await StartFuncFromMiddlewares({
        inEditorPath, inTableName, inColumnsAsArray,
        inVersion: LocalVersion, inTaskName: CommonTaskName
    });
};

module.exports = { StartFunc };
