import { commands, window, workspace, Position, Selection, TextDocument } from 'vscode';
import { getConf } from '../utils/config';

export function showTopFile() {
    return commands.registerCommand('fileShortcut.showTopFile', async () => {
        var filePaths = getConf('list') as string[] || [];
        if (!filePaths.length){
            window.showErrorMessage(`No config file found`);
            return
        } else {
            openFile(filePaths[0])
        }
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

async function openFile(filePath: string) {
    const fileName = filePath.split("/").pop()
    try {
        const document = await workspace.openTextDocument(filePath);
        showDocument(document)
        // window.showInformationMessage(`Success : ${filePath}`);
    } catch (error) {
        if (error.message.includes("cannot open file")) {
            window.setStatusBarMessage(`$(x) File ${fileName} not found`, 2000);
        }
    }
}

async function showQuickPick(filePaths: string[]) {
    let i = 0;
    const filePath = await window.showQuickPick(filePaths, {
        placeHolder: 'Pick a file to open',
        // onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
    });
    openFile(filePath);
}
