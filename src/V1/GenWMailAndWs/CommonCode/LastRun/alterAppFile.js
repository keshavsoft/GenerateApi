const fse = require('fs-extra');
const { StartFunc: StartFuncFromWithMiddleware } = require("./withMiddleware");
const { StartFunc: StartFuncFromWithOutMiddleware } = require("./withOutMiddleware");

const StartFunc = ({ filePath, newVersion, inNewVersionProtected }) => {
    const content = fse.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    StartFuncFromWithOutMiddleware({ inLines: lines, inNewVersion: newVersion });

    fse.writeFileSync(filePath, lines.join('\n'), 'utf-8');
};

module.exports = { StartFunc };
