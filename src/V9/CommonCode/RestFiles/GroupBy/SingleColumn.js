const fse = require('fs-extra');

const StartFunc = ({ inFilePath, inTableName, inVersion, inPortNumber, inColumnsAsArray }) => {
    const filePath = inFilePath;

    fse.readFile(filePath, 'utf-8', (err, contents) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        };

        let updatedContents = contents.replace(new RegExp("{PortNumber}", 'g'), inPortNumber);
        let updatedContents1 = updatedContents.replace(new RegExp("{Version}", 'g'), inVersion);
        let updatedContents2 = updatedContents1.replace(new RegExp("{TableName}", 'g'), inTableName);

        fse.writeFile(filePath, updatedContents2, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('String replaced successfully in', filePath);
        });
    });
};

module.exports = { StartFunc };
