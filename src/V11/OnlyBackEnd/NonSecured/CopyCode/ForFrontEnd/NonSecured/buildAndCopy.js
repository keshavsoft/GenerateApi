import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/* ================= CONFIG ================= */
const CONFIG = {
    PUBLIC_DIR: "Public",
    VERSION_PREFIX: "V",
    SCHEMA_FILE: "ui.json",
    SCHEMA_FOLDER: "Schemas",
    COMMON_REPO: "VoltUiGulpV1",
    COMMON_REPO_GIT: "https://github.com/keshavsoft/VoltUiGulpV1"
};

CONFIG.COMMON_REPO_PATH = path.join("..", CONFIG.COMMON_REPO);
/* ========================================== */

/* ---------- GENERIC ---------- */
const Utils = {
    run(cmd, cwd = process.cwd()) {
        console.log(`> ${cmd}`);
        execSync(cmd, { stdio: "inherit", cwd });
    },

    ensureDir(dir) {
        fs.mkdirSync(dir, { recursive: true });
    },

    copyRecursive(src, dest) {
        fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                this.ensureDir(destPath);
                this.copyRecursive(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }
};

/* ---------- VERSION (Release Manager) ---------- */
const Version = {
    getNext() {
        let max = 0;

        if (fs.existsSync(CONFIG.PUBLIC_DIR)) {
            fs.readdirSync(CONFIG.PUBLIC_DIR, { withFileTypes: true })
                .filter(d => d.isDirectory() && d.name.startsWith(CONFIG.VERSION_PREFIX))
                .forEach(d => {
                    const n = parseInt(d.name.replace(CONFIG.VERSION_PREFIX, ""), 10);
                    if (!isNaN(n) && n > max) max = n;
                });
        }

        return `${CONFIG.VERSION_PREFIX}${max + 1}`;
    },

    createFolder(version) {
        const versionPath = path.join(CONFIG.PUBLIC_DIR, version);
        Utils.ensureDir(versionPath);
        return versionPath;
    }
};

/* ---------- REPO (Installer) ---------- */
const Repo = {
    ensureCloned() {
        if (!fs.existsSync(CONFIG.COMMON_REPO_PATH)) {
            console.log(`${CONFIG.COMMON_REPO} not found. Cloning...`);
            Utils.run(`git clone ${CONFIG.COMMON_REPO_GIT} ${CONFIG.COMMON_REPO_PATH}`);
        }
    },

    ensureDependencies() {
        if (!fs.existsSync(path.join(CONFIG.COMMON_REPO_PATH, "node_modules"))) {
            console.log("Installing dependencies...");
            Utils.run("npm install", CONFIG.COMMON_REPO_PATH);
        }
    },

    copyEnv() {
        if (fs.existsSync(".env")) {
            fs.copyFileSync(".env", path.join(CONFIG.COMMON_REPO_PATH, ".env"));
        }
    },

    prepare() {
        this.ensureCloned();
        this.ensureDependencies();
        this.copyEnv();
    }
};

/* ---------- SCHEMA (Data Supplier) ---------- */
const Schema = {
    readAll() {
        const uiJson = fs.readFileSync(CONFIG.SCHEMA_FILE);
        const parsed = JSON.parse(uiJson);
        return parsed.Tables || [];
    },

    inject(schemaFile) {
        fs.copyFileSync(
            path.join(CONFIG.SCHEMA_FOLDER, `${schemaFile}.json`),
            path.join(CONFIG.COMMON_REPO_PATH, "schema.json")
        );
    }
};

/* ---------- BUILD (Compiler) ---------- */
const Build = {
    run() {
        Utils.run("npm run NonSec", CONFIG.COMMON_REPO_PATH);
    }
};

/* ---------- PUBLISH (Deployer) ---------- */
const Publish = {
    schema(versionPath, schemaFile) {
        const schemaName = path.parse(schemaFile).name;
        const targetDir = path.join(versionPath, schemaName);
        const unProtectedDir = path.join(targetDir, "UnProtected");

        Utils.ensureDir(unProtectedDir);

        Utils.copyRecursive(
            path.join(CONFIG.COMMON_REPO_PATH, "dist"),
            unProtectedDir
        );

        fs.copyFileSync(
            path.join(CONFIG.COMMON_REPO_PATH, "Menu", "index.html"),
            path.join(targetDir, "index.html")
        );
    }
};

/* ---------- ORCHESTRATOR (Boss) ---------- */
const App = {
    processSchema(versionPath, schemaFile) {
        console.log(`\nProcessing ${schemaFile}`);
        Schema.inject(schemaFile);
        Build.run();
        Publish.schema(versionPath, schemaFile);
        console.log(`Done with ${schemaFile}`);
    },

    run() {
        const version = Version.getNext();
        console.log("Next Version:", version);

        const versionPath = Version.createFolder(version);

        Repo.prepare();

        const schemas = Schema.readAll();
        schemas.forEach(schema => this.processSchema(versionPath, schema));

        console.log("\n✔ All schemas processed successfully");
    }
};

App.run();
