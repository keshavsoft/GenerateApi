const vscode = require("vscode");
const fs = require("fs");

const { StartFunc: ForMaxVersion } = require("../ForMaxVersion/entryFile");
const { StartFunc: OpenApp } = require("./openApp");
const { StartFunc: ReadEnv } = require("./readEnvFile");
const { StartFunc: FirstCopy } = require("../FirstCopy/entryFile");
const { StartFunc: GetMaxVersion } = require("./getMaxVersion");
const { StartFunc: LastRun } = require("../LastRun/entryFile");
const { StartFunc: Recur } = require("../ForRestClients/entryFile");
const { StartFunc: RunServer } = require("./serverRun");

/* ---------- MAIN ---------- */

const StartFunc = async ({ inToPath }) => {
    console.log("StartFunc called with path", inToPath);

    const version = await prepareNonSecureEndpoints({ inToPath });

    if (!version) {
        console.log("❌ Version preparation failed");
        return false;
    }

    LastRun({
        filePath: `${inToPath}/app.js`,
        newVersion: version,
        inToPath
    });

    await OpenApp({ inToPath });
    RunServer(inToPath);
    return true;
};

/* ---------- CORE FLOW ---------- */

const prepareNonSecureEndpoints = async ({ inToPath }) => {
    console.log("Preparing endpoints for", inToPath);

    const version = await getOrCreateVersion({
        inVersionStart: "V",
        inToPath
    });

    if (!version) return false;

    const env = ReadEnv({ inRootPath: inToPath });

    if (!env) {
        vscode.window.showInformationMessage(".env file not found");
        return false;
    }

    console.log("ENV loaded", env);

    const success = await ForMaxVersion({
        inDataPath: env.DataPath || "",
        inPortNumber: env.PORT || "",
        inToPath,
        inVersion: version
    });

    if (!success) {
        vscode.window.showInformationMessage("No table schema found");
        return false;
    }

    Recur(
        inToPath.replaceAll("\\", "/"),
        `${inToPath}/${version}`,
        version,
        env.PORT
    );

    console.log("✅ Preparation completed with version", version);

    return version;
};

/* ---------- VERSION ---------- */

const getOrCreateVersion = async ({ inVersionStart, inToPath }) => {

    let version = `${inVersionStart}1`;

    const maxVersion = await GetMaxVersion({
        inToPath,
        inVersionStart
    });

    console.log("Max version found", maxVersion);

    if (maxVersion === 0) {
        if (!fs.existsSync(`${inToPath}/app.js`)) {
            console.log("app.js not found → copying base files");

            const copied = await FirstCopy({ inToPath });
            if (!copied) return false;
        }
    } else {
        version = `${inVersionStart}${maxVersion}`;
    }

    return version;
};

/* ---------- EXPORT ---------- */

module.exports = { StartFunc };
