const fse = require('fs-extra');
const CommonParamsJson = require('./params.json');

const StartFunc = ({ inTableName, inToPath, inVersion, inForeignkeyTables, inDependantTables, inColumnsWithSchema }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    const data = { ...CommonParamsJson };
    data.TableName = LocalTableName;
    data.ForeignkeyTables = inForeignkeyTables;
    data.DependantTables = inDependantTables;
    data.columns = inColumnsWithSchema;
    data.defaultObject = getDefaults(inColumnsWithSchema);

    const LocalFilePath = `${LocalToPath}/${LocalVersion}/${LocalTableName}/CommonFuncs/params.json`;

    try {
        fse.outputFileSync(LocalFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("error : ", error);
    };
};

const getDefaults = (columns) =>
    columns.reduce((acc, { field, defaultvalue }) => {
        if (defaultvalue !== undefined) acc[field] = defaultvalue;
        return acc;
    }, {});

module.exports = { StartFunc };