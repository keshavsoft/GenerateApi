import { startFunc as prepareClientData } from "./prepareClientData.js";
import { startFunc as prepareTallyJson } from "./prepareTallyJson/entryFile.js";

const startFunc = ({ inPk }) => {
    try {
        let data = prepareTallyJson();

        const fromClientData = prepareClientData({ inTallyJson: data, inPk });

        return fromClientData;
    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    };
};

export { startFunc };