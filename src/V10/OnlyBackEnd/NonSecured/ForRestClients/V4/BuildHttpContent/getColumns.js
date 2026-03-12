const getColumns = (currentPath) => {
    const columnsJsonPath = path.join(currentPath, "..", "CommonFuncs", "params.json");

    const columnsData = fs.readFileSync(columnsJsonPath, "utf8");
    const columnsDataAsJson = JSON.parse(columnsData);

    return columnsDataAsJson.columns
        .filter(col => col?.isConsider === true)
        .map(col => col.field);
};