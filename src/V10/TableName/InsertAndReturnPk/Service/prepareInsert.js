const prepareInsert = ({ data, inRequestBody, nextPk }) => {
    const newRow = {
        ...inRequestBody,
        pk: nextPk
    };

    data.push(newRow);

    return data;
};

export { prepareInsert };