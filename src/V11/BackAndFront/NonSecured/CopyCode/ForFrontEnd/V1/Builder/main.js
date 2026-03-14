import { getNextVersion, createVersionFolder } from "./version.js";

import { prepareRepo } from "./repo.js";
import { readSchemas, injectSchema } from "./schema.js";
import { buildProject } from "./build.js";
import { publishSchema } from "./publish.js";
import fs from "fs";

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__dirname);


function processSchema(versionPath, schema) {
    console.log(`\nProcessing ${schema}`);

    injectSchema({ inSchemaJson: schema });

    buildProject();

    publishSchema(versionPath, schema);

    console.log(`Done with ${schema}`);
}

function main() {
    const version = getNextVersion();
    console.log("Next Version:", version);

    const versionPath = createVersionFolder(version);

    prepareRepo();

    let tablesObject = {};
    tablesObject.tables = prepareTotalObject();

    processSchema(versionPath, tablesObject);

    console.log("\n✔ All schemas processed successfully");
}

const prepareTotalObject = () => {
    let LocalReturnArray = [];

    const schemas = readSchemas();

    console.log("aaaaa", schemas);

    schemas.forEach(s => {
        LocalReturnArray.push(readSchema({ inTableName: s }));
    });

    return LocalReturnArray;
    // processSchema(versionPath, s));
};

const readSchema = ({ inTableName }) => {
    const filePath = path.join(__dirname, "..", "..", "..", "Schemas", `${inTableName}.json`);

    const uiJson = fs.readFileSync(filePath);

    // const uiJson = fs.readFileSync(`${__dirname}/Schemas/${inTableName}`);
    const parsed = JSON.parse(uiJson);
    return parsed;
};

main();