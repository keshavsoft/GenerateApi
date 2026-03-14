import path from "path";

export const CONFIG = {
    PUBLIC_DIR: "Public",
    VERSION_PREFIX: "V",
    SCHEMA_FILE: "ui.json",
    SCHEMA_FOLDER: "Schemas",
    COMMON_REPO: "VoltUiGulpV3",
    COMMON_REPO_GIT: "https://github.com/keshavsoft/VoltUiGulpV3"
};

CONFIG.COMMON_REPO_PATH = path.join("..", CONFIG.COMMON_REPO);