const fse = require('fs-extra');
const CommonParamsJson = require('./params.json');

const StartFunc = ({ inTableName, inToPath, inVersion }) => {
    const LocalTableName = inTableName;
    const LocalVersion = inVersion;
    const LocalToPath = inToPath;

    const data = { ...CommonParamsJson };
    data.TableName = LocalTableName;

    const LocalFilePath = `${LocalToPath}/${LocalVersion}/${LocalTableName}/CommonFuncs/params.json`;

    try {
        fse.outputFileSync(LocalFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("error : ", error);
    };
};

module.exports = { StartFunc };