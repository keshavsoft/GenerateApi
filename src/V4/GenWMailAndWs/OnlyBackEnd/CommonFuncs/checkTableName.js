const StartFunc = ({ inTableName }) => {
    const LocalNameLength = inTableName.length;

    if (LocalNameLength > 9) false;

    return true;
};

module.exports = { StartFunc };
