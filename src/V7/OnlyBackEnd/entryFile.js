const { StartFunc: StartFuncFromNonSecured } = require("./NonSecured/entryFile");

const StartFunc = () => {
    StartFuncFromNonSecured();
};

module.exports = { StartFunc };