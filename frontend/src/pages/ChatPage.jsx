import ChatBubble from '../components/chat/ChatBubble';
import MessageInput from '../components/chat/MessageInput';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will be rendered here */}
        <ChatBubble message={{ content: 'Hello! How can I help you today?', role: 'assistant' }} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatPage;
