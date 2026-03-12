const buildBody = (columns) => {
    const obj = {};

    columns.forEach(col => obj[col] = "");

    return JSON.stringify(obj, null, 4);
};