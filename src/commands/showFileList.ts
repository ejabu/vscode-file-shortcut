import { commands, window, workspace, Position, Selection, TextDocument } from 'vscode';
import { getConf } from '../utils/config';


export function showFileList() {
    return commands.registerCommand('fileShortcut.showFileList', async () => {
        var filePaths = getConf('list') as string[] || [];
        showQuickPick(filePaths)
    });
}

async function showDocument(document: TextDocument) {
    const textEditor = await window.showTextDocument(document, { preview: false });

    var lastLineIndex = document.lineCount - 1;

    var lastCharRange = document.lineAt(lastLineIndex).range
    var lastCharPosition = document.lineAt(lastLineIndex).range.end

    var newSelection = new Selection(lastCharPosition, lastCharPosition);
    textEditor.revealRange(lastCharRange, 1)
    textEditor.selection = newSelection;
}

export async function showQuickPick(filePaths: string[]) {
    let i = 0;
    const result = await window.showQuickPick(filePaths, {
        placeHolder: 'Pick a file to open',
        // onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
    });
    const fileName = result.split("/").pop()
    try {
        const document = await workspace.openTextDocument(result);
        showDocument(document)
        // window.showInformationMessage(`Success : ${result}`);
    } catch (error) {
        if (error.message.includes("cannot open file")) {
            window.setStatusBarMessage(`$(x) File ${fileName} not found`, 2000);
        }
    }
}
