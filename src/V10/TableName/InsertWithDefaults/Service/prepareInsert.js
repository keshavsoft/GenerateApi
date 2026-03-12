import ParamsJson from "../../CommonFuncs/params.json" with { type: "json" };

const prepareInsert = ({ data, inRequestBody, nextPk }) => {
    const LocalDefaultObject = ParamsJson.defaultObject;

    const newRow = {
        ...LocalDefaultObject,
        ...inRequestBody,
        pk: nextPk
    };

    data.push(newRow);

    return data;
};

export { prepareInsert };