import fs from "fs";
import path from "path";
import { CONFIG } from "./config.js";

export function readSchemas() {
    const uiJson = fs.readFileSync(CONFIG.SCHEMA_FILE);
    const parsed = JSON.parse(uiJson);
    return parsed.Tables || [];
}

export function injectSchema(schemaFile) {
    fs.copyFileSync(
        path.join(CONFIG.SCHEMA_FOLDER, `${schemaFile}.json`),
        path.join(CONFIG.COMMON_REPO_PATH, "schema.json")
    );
}