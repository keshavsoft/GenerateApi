const { StartFunc: StartFuncFromOnlyBackEnd } = require("./OnlyBackEnd/entryFile");
const { StartFunc: BackAndFront } = require("./BackAndFront/entryFile");

const StartFunc = () => {
    StartFuncFromOnlyBackEnd();
    BackAndFront();
};

module.exports = { StartFunc };