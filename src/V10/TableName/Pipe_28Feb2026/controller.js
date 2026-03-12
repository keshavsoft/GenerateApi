import {
    StartFunc as StartFuncFromInsertToFile
} from './insertToFile.js';

const postFilterDataFromBodyFunc = async (req, res) => {
    const result = await StartFuncFromInsertToFile({
        inputStream: req
    });

    if (!result.KTF) {
        res.status(409).send(result.KReason);
        return;
    }

    res.type("text/plain").send(result.SuccessText);
};

export { postFilterDataFromBodyFunc };