const fs = require('fs');

function StartFunc({ inRootPath }) {
    try {
        const filePath = ".env";
        const fileContents = fs.readFileSync(`${inRootPath}/${filePath}`, 'utf-8');
        const envVariables = {};
        const lines = fileContents.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, value] = trimmedLine.split('=').map(part => part.trim());
                envVariables[key] = value;
            }
        };

        return envVariables;
    } catch (error) {
        console.error('Error reading .env file:', error);
        return null;
    }
};

module.exports = { StartFunc };
