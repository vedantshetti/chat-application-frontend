// SendInput.jsx
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Send message response:", res.data);

      // Fix: Handle the response properly
      if (res.data.success && res.data.data) {
        // Ensure messages is an array before spreading
        const currentMessages = Array.isArray(messages) ? messages : [];
        dispatch(setMessages([...currentMessages, res.data.data]));
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
    setMessage("");
  };

  return (
    <div className="px-4 py-3 bg-gray-900 border-t border-gray-600">
      <form onSubmit={onSubmitHandler} className="w-full">
        <div className="w-full relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-lg block w-full p-3 pr-12 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center pr-4 text-blue-400 hover:text-blue-300 disabled:text-gray-500"
            disabled={!message.trim()}
          >
            <IoSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;
