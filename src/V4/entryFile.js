const { StartFunc: StartFuncFromGenWMailAndWs } = require("./GenWMailAndWs/entryFile");

const StartFunc = () => {
    StartFuncFromGenWMailAndWs();
};

module.exports = { StartFunc };