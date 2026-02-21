const StartFunc = ({ inLines, inNewVersion }) => {
    const LocalLines = inLines;

    LocalFuncForImport({ inLines: LocalLines, inNewVersion });
    LocalFuncForUse({ inLines: LocalLines, inNewVersion });
};

const LocalFuncForImport = ({ inLines, inNewVersion }) => {
    const LocalnewVersion = inNewVersion;
    const LocalLines = inLines;

    const importLine = `import { router as routerFrom${LocalnewVersion} } from "./${LocalnewVersion}/routes.js";`;

    const alreadyImported = LocalLines.some(line => line.trim() === importLine);

    if (!alreadyImported) {
        const lastImportIndex = LocalLines.reduce((acc, line, i) =>
            line.startsWith('import') ? i : acc, -1);
        LocalLines.splice(lastImportIndex + 1, 0, importLine);
    };
};

const LocalFuncForUse = ({ inLines, inNewVersion }) => {
    const LocalnewVersion = inNewVersion;
    const LocalLines = inLines;

    const useLine = `app.use("/${LocalnewVersion}", routerFrom${LocalnewVersion});`;

    const alreadyUsed = LocalLines.some(line => line.trim() === useLine);

    if (!alreadyUsed) {
        const lastUseIndex = LocalLines.reduce((acc, line, i) =>
            line.trim().startsWith('app.use(') ? i : acc, -1);
        LocalLines.splice(lastUseIndex + 1, 0, useLine);
    };
};

module.exports = { StartFunc };
