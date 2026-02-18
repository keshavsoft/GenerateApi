const fse = require('fs-extra');
const { StartFunc: StartFuncFromWithOutMiddleware } = require("./withOutMiddleware");

const StartFunc = ({ filePath, newVersion }) => {
    const content = fse.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    StartFuncFromWithOutMiddleware({ inLines: lines, inNewVersion: newVersion });

    fse.writeFileSync(filePath, lines.join('\n'), 'utf-8');
};

module.exports = { StartFunc };
