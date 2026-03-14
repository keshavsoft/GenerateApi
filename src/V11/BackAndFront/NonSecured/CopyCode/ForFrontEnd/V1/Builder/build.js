import { CONFIG } from "./config.js";
import { run } from "./utils.js";

export function buildProject() {
    run("npm run dist", CONFIG.COMMON_REPO_PATH);
}