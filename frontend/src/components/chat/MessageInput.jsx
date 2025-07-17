import { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle message sending logic here
    console.log(message);
    setMessage('');
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
