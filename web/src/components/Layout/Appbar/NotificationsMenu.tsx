import IconDropdown from '@Common/IconDropdown';
import { NotificationsIcon } from '@Common/Icons';

const notifications = [
  {
    label: 'Notification 1',
    onSelect: () => console.log('Notification selected'),
  },
  {
    label: 'Notification 2',
    onSelect: () => console.log('Notification selected'),
  },
  {
    label: 'Notification 3',
    onSelect: () => console.log('Notification selected'),
  },
  {
    label: 'Notification 4',
    onSelect: () => console.log('Notification selected'),
  },
];

function NotificationsMenu() {
  return <IconDropdown icon={<NotificationsIcon />} items={notifications} />;
}

export default NotificationsMenu;
