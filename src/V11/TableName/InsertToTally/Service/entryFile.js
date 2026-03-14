import { startFunc as PrepareDataObject } from "./PrepareDataObject/entryFile.js"
import { startFunc as sendToTally } from "./sendToTally.js"

const StartFunc = async ({ inPk }) => {
    return await createSalesVoucher({ inPk });
};

async function createSalesVoucher({ inPk }) {
    try {
        const data = PrepareDataObject({ inPk });
        const result = await sendToTally(data);

        if (result.data.import_result.created === 1) {
            // insertToJson({ inData: data });

            console.log(`data inserted to import.json`);

            return await result.data.import_result.lastvchid;
        };

        console.log("TALLY RESPONSE:", result);
    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    };
};

export { StartFunc };