import fs from "fs";
import path from "path";
import { CONFIG } from "./config.js";
import { ensureDir, copyRecursive } from "./utils.js";

export function publishSchema(versionPath, schemaFile) {
    // const schemaName = path.parse(schemaFile).name;
    // const targetDir = path.join(versionPath, schemaName);
    // const unProtectedDir = path.join(targetDir, "UnProtected");

    ensureDir(versionPath);

    copyRecursive(
        path.join(CONFIG.COMMON_REPO_PATH, "dist"),
        versionPath
    );

    // fs.copyFileSync(
    //     path.join(CONFIG.COMMON_REPO_PATH, "Menu", "index.html"),
    //     path.join(targetDir, "index.html")
    // );
}