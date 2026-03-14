const getNextPk = ({ data }) => {

    const pkArray = data
        .map(e => e.pk)
        .filter(e => e !== undefined)
        .map(Number);

    return Math.max(...pkArray, 0) + 1;
};

export { getNextPk };