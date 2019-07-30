import statusBarButton from './status';
import { showFileList } from './commands';

export function activate({ subscriptions }) {
    subscriptions.push(statusBarButton);
    subscriptions.push(showFileList());
}
