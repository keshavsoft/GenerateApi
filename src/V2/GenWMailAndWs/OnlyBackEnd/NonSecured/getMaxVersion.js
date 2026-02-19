const fse = require('fs-extra');

function compareNumbers(a, b) {
    return a - b;
};

const StartFunc = async ({ inToPath, inVersionStart }) => {
    const folders = await getFoldersInDirectory({ inToPath, inVersionStart });
    const sortedArray = folders.sort(compareNumbers);

    if (sortedArray.length === 0) {
        return 0;
    } else {
        const LocalMaxersion = sortedArray[sortedArray.length - 1] + 1;

        return LocalMaxersion;
    };
};

const getFoldersInDirectory = async ({ inToPath, inVersionStart }) => {
    try {
        const entries = await fse.readdir(inToPath, { withFileTypes: true });
        const folders = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                if (entry.name.startsWith(inVersionStart)) {
                    folders.push(parseInt(entry.name.replace(inVersionStart, "")));
                };
            };
        };

        return folders;
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        return []; // Return an empty array or rethrow the error as needed
    }
};

module.exports = { StartFunc };