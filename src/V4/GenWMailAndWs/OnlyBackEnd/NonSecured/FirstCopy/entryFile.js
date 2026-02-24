const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');

const { StartFunc: StartFuncFromChecks } = require('./Checks/forSchemaJson');
const { StartFunc: StartFuncFromCreateSchema } = require("./CreateSchema/entryFile");

const StartFunc = async ({ inToPath }) => {
    try {
        const LocalToPath = inToPath;
        const LocalIfExists = StartFuncFromChecks({ inRootPath: LocalToPath });

        if (LocalIfExists === false) {
            await StartFuncFromCreateSchema({ inToPath: LocalToPath });

            return await false;
        };

        const LocalFromPath = path.join(__dirname, "..", "CopyCode");

        await fse.copy(LocalFromPath, LocalToPath);

        return await true;
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };