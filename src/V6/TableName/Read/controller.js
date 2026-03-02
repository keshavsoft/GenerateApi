import { StartFunc as ServiceToRead } from './service.js';
import { ConflictError, StorageError } from './errors.js';

const postFilterDataFromBodyFunc = (req, res) => {
    try {
        const message = ServiceToRead();

        res.type("application/json").send(message);
    } catch (err) {
        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { postFilterDataFromBodyFunc };