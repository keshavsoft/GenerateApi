const fs = require("fs");
const CommonFolderName = "Schemas";
const path = require("path");

const StartFunc = ({ inToPath }) => {
    const LocalToPath = inToPath;

    try {
        fs.writeFileSync(
            `${LocalToPath}/schema.json`,
            JSON.stringify({
                Tables: ["TasksTable", "TokenTable", "UsersTable"]
            })
        );

        fs.mkdirSync(`${LocalToPath}/${CommonFolderName}`);

        LocalFuncForTables({ inToPath: LocalToPath });

        fs.copyFileSync(
            path.join(__dirname, ".env"),
            `${LocalToPath}/.env`
        );
    } catch (err) {
        console.error('Error creating directory:', err.message);
    };
};

const LocalFuncForTables = ({ inToPath }) => {
    const LocalToPath = inToPath;
    const LocalJsonFilesPath = "JsonFiles";

    fs.copyFileSync(
        path.join(__dirname, LocalJsonFilesPath, "TasksTable.json"),
        `${LocalToPath}/${CommonFolderName}/TasksTable.json`
    );

    fs.copyFileSync(
        path.join(__dirname, LocalJsonFilesPath, "TokenTable.json"),
        `${LocalToPath}/${CommonFolderName}/TokenTable.json`
    );

    fs.copyFileSync(
        path.join(__dirname, LocalJsonFilesPath, "UsersTable.json"),
        `${LocalToPath}/${CommonFolderName}/UsersTable.json`
    );
};

module.exports = { StartFunc };