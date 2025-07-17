import { Link } from 'react-router-dom';

const SettingsPanel = () => {
  return (
    <div className="mt-4">
      <Link to="/settings" className="text-blue-500 hover:underline">Settings</Link>
    </div>
  );
};

export default SettingsPanel;
