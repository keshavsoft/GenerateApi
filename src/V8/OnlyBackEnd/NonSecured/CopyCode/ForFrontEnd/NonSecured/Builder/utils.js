import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function run(cmd, cwd = process.cwd()) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: "inherit", cwd });
}

export function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

export function copyRecursive(src, dest) {
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            ensureDir(destPath);
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}