const fs = require('fs');

function StartFunc({ inEditorPath, inTableName, inDataPath, inVersion, inColumnsAsArray, inColumnsWithSchema, inDefaultObjectToInsert }) {
    const LocalVersion = inVersion;

    try {
        const filePath = "params.json";
        const fileContents = fs.readFileSync(`${inEditorPath}/${LocalVersion}/${inTableName}/CommonFuncs/${filePath}`, 'utf-8');
        let fileContentsAsJson = JSON.parse(fileContents);

        fileContentsAsJson.TableName = inTableName;
        fileContentsAsJson.DataPath = inDataPath;
        fileContentsAsJson.Columns = inColumnsAsArray;
        fileContentsAsJson.ColumnsWithSchema = inColumnsWithSchema;
        fileContentsAsJson.DefaultObjectToInsert = inDefaultObjectToInsert;

        fs.writeFileSync(`${inEditorPath}/${LocalVersion}/${inTableName}/CommonFuncs/${filePath}`, JSON.stringify(fileContentsAsJson), 'utf-8');
    } catch (error) {
        console.error('Error reading .env file:', error);
        return null;
    }
};

module.exports = { StartFunc };
