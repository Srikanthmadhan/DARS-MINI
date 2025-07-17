import ChatList from './ChatList';
import PinnedMessages from './PinnedMessages';
import SettingsPanel from './SettingsPanel';

const Sidebar = () => {
  return (
    <div className="w-64 p-4 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Chats</h2>
      <ChatList />
      <PinnedMessages />
      <SettingsPanel />
    </div>
  );
};

export default Sidebar;
