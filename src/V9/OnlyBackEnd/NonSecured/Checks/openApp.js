const vscode = require('vscode');

const StartFunc = async ({ inToPath }) => {
    try {
        const LocalToPath = inToPath;

        const filePath = `${LocalToPath}/schema.json`;

        var openPath = vscode.Uri.file(filePath);
        var pos1 = new vscode.Position(0, 0);

        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc).then(editor => {
                // Line added - by having a selection at the same position twice, the cursor jumps there
                editor.selections = [new vscode.Selection(pos1, pos1)];

                // And the visible range jumps there too
                var range = new vscode.Range(pos1, pos1);
                editor.revealRange(range);
            });
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };