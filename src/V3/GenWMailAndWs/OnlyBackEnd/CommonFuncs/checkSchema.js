const StartFunc = ({ inColumnsAsArray }) => {
    const LocalFindFault = inColumnsAsArray.find(element => {
        return element.field.includes(".");
    });

    if (LocalFindFault) {
        return false
    };

    const LocalFindFaultSpace = inColumnsAsArray.find(element => element.field.includes(" "));

    if (LocalFindFaultSpace) false;

    const LocalFindFaultSlash = inColumnsAsArray.find(element => element.field.includes("/"));

    if (LocalFindFaultSlash) false;

    return true;
};

module.exports = { StartFunc };
