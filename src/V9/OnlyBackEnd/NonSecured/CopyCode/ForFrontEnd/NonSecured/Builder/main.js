import { getNextVersion, createVersionFolder } from "./version.js";
import { prepareRepo } from "./repo.js";
import { readSchemas, injectSchema } from "./schema.js";
import { buildProject } from "./build.js";
import { publishSchema } from "./publish.js";

function processSchema(versionPath, schema) {
    console.log(`\nProcessing ${schema}`);
    injectSchema(schema);
    buildProject();
    publishSchema(versionPath, schema);
    console.log(`Done with ${schema}`);
}

function main() {
    const version = getNextVersion();
    console.log("Next Version:", version);

    const versionPath = createVersionFolder(version);

    prepareRepo();

    const schemas = readSchemas();
    schemas.forEach(s => processSchema(versionPath, s));

    console.log("\n✔ All schemas processed successfully");
}

main();