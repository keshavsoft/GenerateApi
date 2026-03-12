import fs from "fs";
import path from "path";
import { CONFIG } from "./config.js";
import { run } from "./utils.js";

export function prepareRepo() {
    if (!fs.existsSync(CONFIG.COMMON_REPO_PATH)) {
        console.log(`${CONFIG.COMMON_REPO} not found. Cloning...`);
        run(`git clone ${CONFIG.COMMON_REPO_GIT} ${CONFIG.COMMON_REPO_PATH}`);
    }

    if (!fs.existsSync(path.join(CONFIG.COMMON_REPO_PATH, "node_modules"))) {
        console.log("Installing dependencies...");
        run("npm install", CONFIG.COMMON_REPO_PATH);
    }

    if (fs.existsSync(".env")) {
        fs.copyFileSync(".env", path.join(CONFIG.COMMON_REPO_PATH, ".env"));
    }
}