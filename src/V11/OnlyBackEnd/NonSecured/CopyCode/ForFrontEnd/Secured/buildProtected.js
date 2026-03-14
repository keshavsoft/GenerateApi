import fs from "fs";
import path from "path";

import { execSync } from "child_process";

/* ================= CONFIG ================= */
const PUBLIC_DIR = "Public";
const VERSION_PREFIX = "V";
const SCHEMA_DIR = "ui.json";
const COMMON_REPO = "VoltUiGulpV1";
const COMMON_REPO_GIT = `https://github.com/keshavsoft/${COMMON_REPO}`;
const COMMON_REPO_PATH = path.join("..", COMMON_REPO);
/* ========================================== */

function run(cmd, cwd = process.cwd()) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: "inherit", cwd });
}

/* ---------- STEP 1: GET NEXT VERSION ---------- */
let max = 0;

if (fs.existsSync(PUBLIC_DIR)) {
    fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory() && d.name.startsWith(VERSION_PREFIX))
        .forEach(d => {
            const n = parseInt(d.name.replace(VERSION_PREFIX, ""), 10);
            if (!isNaN(n) && n > max) max = n;
        });
};

const nextVersion = `${VERSION_PREFIX}${max + 1}`;
console.log("Next Version:", nextVersion);

const versionPath = path.join(PUBLIC_DIR, nextVersion);
fs.mkdirSync(versionPath, { recursive: true });

/* ---------- STEP 2: CLONE COMMON REPO ---------- */
if (!fs.existsSync(COMMON_REPO_PATH)) {
    console.log(`${COMMON_REPO} not found. Cloning...`);
    run(`git clone ${COMMON_REPO_GIT} ${COMMON_REPO_PATH}`);
}

/* ---------- STEP 3: INSTALL DEPENDENCIES ---------- */
if (!fs.existsSync(path.join(COMMON_REPO_PATH, "node_modules"))) {
    console.log("node_modules not found. Running npm install...");
    run("npm install", COMMON_REPO_PATH);
}

/* ---------- STEP 4: COPY .env ---------- */
if (fs.existsSync(".env")) {
    fs.copyFileSync(".env", path.join(COMMON_REPO_PATH, ".env"));
}

/* ---------- STEP 5: PROCESS SCHEMAS ---------- */
const uiJson = fs.readFileSync(SCHEMA_DIR);
const uiJsonParsed = JSON.parse(uiJson);

uiJsonParsed.Tables.forEach(schemaFile => {
    const schemaName = path.parse(schemaFile).name;
    console.log(`\nProcessing ${schemaFile}`);

    /* Copy schema */
    fs.copyFileSync(
        path.join("Schemas", `${schemaFile}.json`),
        path.join(COMMON_REPO_PATH, "schema.json")
    );

    /* Build */
    run("npm run NonSec", COMMON_REPO_PATH);

    /* Target dirs */
    const targetDir = path.join(versionPath, schemaName);
    const protectedDir = path.join(targetDir, "UnProtected");

    fs.mkdirSync(protectedDir, { recursive: true });

    /* Copy dist */
    copyRecursive(
        path.join(COMMON_REPO_PATH, "dist"),
        protectedDir
    );

    /* Copy menu */
    fs.copyFileSync(
        path.join(COMMON_REPO_PATH, "Menu", "index.html"),
        path.join(targetDir, "index.html")
    );

    console.log(`Done with ${schemaFile}`);
});

console.log("\n✔ All schemas processed successfully");

/* ---------- UTIL ---------- */
function copyRecursive(src, dest) {
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};
