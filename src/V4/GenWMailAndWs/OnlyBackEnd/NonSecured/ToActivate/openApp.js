const vscode = require("vscode");

const StartFunc = async ({ inToPath }) => {
    try {
        const filePath = `${inToPath}/app.js`;
        // console.log("Opening file", filePath);

        const uri = vscode.Uri.file(filePath);
        const position = new vscode.Position(6, 0);

        const doc = await vscode.workspace.openTextDocument(uri);
        const editor = await vscode.window.showTextDocument(doc);

        editor.selection = new vscode.Selection(position, position);
        editor.revealRange(new vscode.Range(position, position));

        // console.log("Cursor moved to line 7");
    } catch (error) {
        console.log("❌ Error", error.message);
        vscode.window.showErrorMessage(`Error opening app.js`);
    }
};

module.exports = { StartFunc };
