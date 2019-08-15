import statusBarButton from './status';
import { showFileList, showTopFile } from './commands';

export function activate({ subscriptions }) {
    subscriptions.push(statusBarButton);
    subscriptions.push(showFileList());
    subscriptions.push(showTopFile());
}
