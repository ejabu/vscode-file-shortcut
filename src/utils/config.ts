import { workspace } from 'vscode';

export function getConf(key: string)  {
    return workspace.getConfiguration('fileShortcut').get(key);
}

