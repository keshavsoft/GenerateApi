import fs from "fs";

const PREFIX = "V";
const ENV_FILE = ".env";

/* -------- STEP 1: GET NEXT VERSION -------- */
const dirs = fs.readdirSync("./", { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith(PREFIX));

let max = 0;

dirs.forEach(d => {
    const num = parseInt(d.name.replace(PREFIX, ""), 10);
    if (!isNaN(num) && num > max) max = num;
});

const latestVersion = `${PREFIX}${max}`;
console.log("Next Version:", latestVersion);

/* -------- STEP 2: UPDATE .env -------- */
let envContent = "";

if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, "utf8")
        .split("\n")
        .map(line =>
            line.startsWith("VERSION=")
                ? `VERSION=${latestVersion}`
                : line
        )
        .join("\n");
} else {
    envContent = `VERSION=${latestVersion}\n`;
};

fs.writeFileSync(ENV_FILE, envContent);

console.log(".env updated successfully ✔");
