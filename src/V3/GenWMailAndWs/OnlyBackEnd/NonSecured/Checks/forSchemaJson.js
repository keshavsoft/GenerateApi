const fs = require('fs');

function StartFunc({ inRootPath }) {
    const filePath = "schema.json";
    const LocalIfExists = fs.existsSync(`${inRootPath}/${filePath}`);

    return LocalIfExists;
};

module.exports = { StartFunc };
