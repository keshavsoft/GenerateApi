import { StartFunc as Service } from "./Service/startFunc.js";
import { ConflictError, StorageError } from "./errors.js";

const GetFunc = (req, res) => {
    try {
        const message = Service();

        const count = Array.isArray(message.JsonData)
            ? message.JsonData.length
            : 0;
        res.status(200).type('text/plain').send(`  ${count}`);

    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { GetFunc };