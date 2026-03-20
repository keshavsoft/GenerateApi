import { StartFunc as Service } from "./Service/startFunc.js";
import { ConflictError, StorageError } from "./errors.js";

const GetMinFunc = (req, res) => {
    try {
        const { columnName } = req.params;
        const message = Service();

        const dataArray = message.JsonData;

        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return res.status(400).send("Data is empty or not an array.");
        }
        const targetKey = columnName.toLowerCase();

        // Collect numeric values from column (even if stored as string)
        const numericValues = [];

        for (const row of dataArray) {
            for (const key in row) {
                if (key.toLowerCase() === targetKey) {
                    const rawValue = row[key];

                    const numeric = Number(rawValue);
                    if (!isNaN(numeric)) {
                        numericValues.push(numeric);
                    }
                }
            }
        }
        if (numericValues.length === 0) {
            return res.status(400).send(`Column '${columnName}' has no numeric values.`);
        }

        const minValue = Math.max(...numericValues);

        res.status(200).send(` ${minValue}`);

    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { GetMinFunc };