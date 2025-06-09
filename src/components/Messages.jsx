// Messages.jsx
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  
  console.log("Messages in component:", messages);
  console.log("Is messages array?", Array.isArray(messages));
  
  // Add better validation
  if (!messages) {
    return (
      <div className="px-4 py-2 h-full overflow-y-auto flex flex-col">
        <div className="text-center text-gray-400 mt-8">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 h-full overflow-y-auto flex flex-col">
      <div className="flex-1">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => {
            // Safety check for each message
            if (!message || !message._id) {
              console.warn("Invalid message object:", message);
              return null;
            }
            return <Message key={message._id} message={message} />;
          })
        ) : (
          <div className="text-center text-gray-400 mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
