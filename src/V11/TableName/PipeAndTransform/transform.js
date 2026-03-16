import ParamsJson from '../CommonFuncs/params.json' with { type: 'json' };
import fs from "fs";

const StartFunc = async () => {
    try {
        const targetPath = `./TallyData/${ParamsJson.TableName}.json`;

        // Read template file
        let template = fs.readFileSync(targetPath, "utf8");

        const body = JSON.parse(template);

        const LocalNewArray = body.data.collection.map(element => {
            return {
                LedgerName: element.metadata.name,
                LedgerParentName: element.parent.value,
                LedgerType: element.metadata.type
            }
        });

        fs.writeFileSync(`./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`, JSON.stringify(LocalNewArray));

    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    }
};

export { StartFunc };