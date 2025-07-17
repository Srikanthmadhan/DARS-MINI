const ChatBubble = ({ message }) => {
  const { content, role } = message;
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`rounded-lg px-4 py-2 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
