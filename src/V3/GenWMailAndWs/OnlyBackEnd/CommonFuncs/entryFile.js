const { StartFunc: StartFuncFromCheckSchema } = require('./checkSchema');
const { StartFunc: StartFuncFromCheckTableName } = require('./checkTableName');
const vscode = require('vscode');

const StartFunc = ({ inColumnsAsArray, inTableName }) => {
    const LocalFromcheckSchema = StartFuncFromCheckSchema({ inColumnsAsArray });

    if (LocalFromcheckSchema === false) {
        vscode.window.showInformationMessage(`field contains invalid char : ${inTableName}`);
        return false;
    };

    const LocalFromCheckTableName = StartFuncFromCheckTableName({ inTableName });

    if (LocalFromCheckTableName === false) {
        vscode.window.showInformationMessage(`tableName length should be less than 9 chars : ${inTableName}`);
        return false;
    };

    return true;
};

module.exports = { StartFunc };
