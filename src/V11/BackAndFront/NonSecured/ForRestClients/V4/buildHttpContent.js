const fs = require("fs");
const path = require("path");

const startFunc = ({ inCurrentPath, method, route, inPortNumber }) => {
    const columnsAsArray = getColumns(inCurrentPath);

    const urlLine = `${method} http://localhost:${inPortNumber}${route}`;

    if (method === "GET") return urlLine;

    const body = buildBody(columnsAsArray);

    return `${urlLine}
Content-Type: application/json

${body}`;
};

const buildBody = (columns) => {
    const obj = {};

    columns.forEach(col => obj[col] = "");

    return JSON.stringify(obj, null, 4);
};

const getColumns = (currentPath) => {
    const columnsJsonPath = path.join(currentPath, "..", "CommonFuncs", "params.json");

    const columnsData = fs.readFileSync(columnsJsonPath, "utf8");
    const columnsDataAsJson = JSON.parse(columnsData);

    return columnsDataAsJson.columns
        .filter(col => col?.isConsider === true)
        .map(col => col.field);
};

module.exports = { startFunc };