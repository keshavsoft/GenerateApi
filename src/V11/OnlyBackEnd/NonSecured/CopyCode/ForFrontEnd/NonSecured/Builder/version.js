import fs from "fs";
import path from "path";
import { CONFIG } from "./config.js";
import { ensureDir } from "./utils.js";

export function getNextVersion() {
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
};

export function createVersionFolder(version) {
    const versionPath = path.join(CONFIG.PUBLIC_DIR, version);
    ensureDir(versionPath);
    return versionPath;
}