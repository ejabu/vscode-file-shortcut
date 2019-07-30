import * as vscode from 'vscode';

const statusBarButton = vscode.window.createStatusBarItem(1, 1000);
statusBarButton.command = 'fileShortcut.showFileList';
statusBarButton.text = `$(diff-renamed) Files`;
statusBarButton.show();

export default statusBarButton;
