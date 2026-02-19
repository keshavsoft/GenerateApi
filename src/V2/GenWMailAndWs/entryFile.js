const { StartFunc: StartFuncFromOnlyBackEnd } = require("./OnlyBackEnd/entryFile");

const StartFunc = () => {
    StartFuncFromOnlyBackEnd();
};

module.exports = { StartFunc };