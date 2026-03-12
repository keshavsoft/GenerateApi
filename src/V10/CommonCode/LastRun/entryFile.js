const { StartFunc: StartFuncFromCopyTokenFolder } = require("./copyTokenFolder");
const { StartFunc: StartFuncFromCreateDataFolder } = require("./createDataFolder");
const { StartFunc: StartFuncFromAlterAppFile } = require("./alterAppFile");

const StartFunc = ({ filePath, newVersion, inToPath }) => {
    StartFuncFromAlterAppFile({ filePath, newVersion });

    StartFuncFromCopyTokenFolder({ inToPath });

    StartFuncFromCreateDataFolder({ inRootPath: inToPath });
};

module.exports = { StartFunc };
