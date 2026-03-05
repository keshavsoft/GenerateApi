import { CONFIG } from "./config.js";
import { run } from "./utils.js";

export function buildProject() {
    run("npm run NonSec", CONFIG.COMMON_REPO_PATH);
}