import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ users }) => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  
  // Use passed users prop if available, otherwise fall back to Redux state
  const displayUsers = users || otherUsers;
  
  if (!displayUsers || displayUsers.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No users available</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1 space-y-1">
      {Array.isArray(displayUsers) && displayUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
