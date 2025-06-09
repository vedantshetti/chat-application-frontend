// MessageContainer.jsx
import { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages"; // Import Messages, not Message
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col h-full">
          {/* Header - Fixed at top */}
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-3 border-b border-gray-600">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p className="font-semibold">{selectedUser?.fullName}</p>
                {isOnline && <span className="text-green-400 text-sm">Online</span>}
              </div>
            </div>
          </div>
          
          {/* Messages - Takes remaining space */}
          <div className="flex-1 overflow-hidden">
            <Messages />
          </div>
          
          {/* Send Input - Fixed at bottom */}
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center bg-gray-800">
          <h1 className="text-4xl text-white font-bold mb-4">
            Hi, {authUser?.fullName}!
          </h1>
          <h1 className="text-2xl text-gray-300">Let's start a conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
