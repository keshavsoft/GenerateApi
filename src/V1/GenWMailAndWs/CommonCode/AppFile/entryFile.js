const fse = require('fs-extra');
const { StartFunc: StartFuncFromWithMiddleware } = require("./withMiddleware");
const { StartFunc: StartFuncFromWithOutMiddleware } = require("./withOutMiddleware");
const { StartFunc: StartFuncFromCopyTokenFolder } = require("./copyTokenFolder");
const { StartFunc: StartFuncFromCreateDataFolder } = require("./createDataFolder");

const updateServerFile = ({ filePath, newVersion, inNewVersionProtected, inToPath }) => {
    const content = fse.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    StartFuncFromWithOutMiddleware({ inLines: lines, inNewVersion: newVersion });
    StartFuncFromWithMiddleware({ inLines: lines, inNewVersion: inNewVersionProtected });

    fse.writeFileSync(filePath, lines.join('\n'), 'utf-8');

    StartFuncFromCopyTokenFolder({ inToPath });

    StartFuncFromCreateDataFolder({ inRootPath: inToPath });
};

module.exports = { updateServerFile };
