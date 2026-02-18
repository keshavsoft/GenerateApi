const fse = require('fs-extra');

const { StartFunc: ImportLine } = require("./importLine");
const { StartFunc: RouterDotLine } = require("./routerDotLine");

const StartFunc = async ({ inEditorPath, inNewRoute }) => {
    try {
        let lines = [];

        lines.push("import express from 'express';");
        lines.push("");
        lines.push("const router = express.Router();");
        lines.push("");
        lines.push("export { router };");

        ImportLine({ inLinesArray: lines, inNewRoute });
        RouterDotLine({ inLinesArray: lines, inNewRoute });

        writeFile(lines, inEditorPath);
    } catch (err) {
        return err.message;
    }
};

const writeFile = (lines, filePath) => {
    fse.writeFileSync(filePath, lines.join('\n'), 'utf-8');
};

module.exports = { StartFunc };
