import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);
  
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`${
        selectedUser?._id === user?._id
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-700"
      } flex gap-3 items-center rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md`}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 h-12 rounded-full ring-2 ring-gray-600">
          <img 
            src={user?.profilePhoto} 
            alt={`${user?.fullName}'s profile`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold truncate">{user?.fullName}</p>
          {isOnline && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Online
            </span>
          )}
        </div>
        <p className="text-sm opacity-70 truncate">@{user?.username}</p>
      </div>
    </div>
  );
};

export default OtherUser;
