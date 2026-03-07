import ParamsJson from '../CommonFuncs/params.json' with {type: 'json'};
import { saveIncomingStream } from "./repository.js";

const StartFunc = async ({ inputStream }) => {
  try {
    await saveIncomingStream(inputStream, `./${ParamsJson.DataPath}/${ParamsJson.TableName}.json`);

    return { KTF: true, SuccessText: "stored" };
  } catch (err) {
    return { KTF: false, KReason: err.message };
  }
};

export { StartFunc };