import { StartFunc as Service } from "./Service/startFunc.js";
import { ConflictError, StorageError } from "./errors.js";

const postInsertFunc = (req, res) => {
    try {
        const inRequestBody = req.body;

        const message = Service({ inRequestBody });

        // res.send(message);
        // res.send(String(message));
        res.type("text/plain").send(String(message))
    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { postInsertFunc };