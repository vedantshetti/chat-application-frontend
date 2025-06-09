import { useState, useEffect } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Store original users when otherUsers changes
  useEffect(() => {
    if (otherUsers && otherUsers.length > 0 && !isSearching) {
      setOriginalUsers(otherUsers);
      setFilteredUsers(otherUsers);
    }
  }, [otherUsers, isSearching]);

  // Real-time search filtering
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(originalUsers);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const filtered = originalUsers.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, originalUsers]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const clearSearch = () => {
    setSearch("");
    setIsSearching(false);
    setFilteredUsers(originalUsers);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optional: You can add additional search logic here
    if (filteredUsers.length === 0 && search.trim() !== "") {
      toast.error("No users found matching your search.");
    }
  };

  return (
    <div className="border-r border-gray-600 p-4 flex flex-col bg-gray-900 min-w-[320px] h-full">
      {/* Search Section */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-2 mb-4"
      >
        <div className="relative flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered rounded-lg w-full pl-4 pr-10 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:outline-none"
            type="text"
            placeholder="Search users..."
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <BiX className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-3"
        >
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      {/* Search Results Info */}
      {isSearching && (
        <div className="mb-2 px-2">
          <p className="text-sm text-gray-400">
            {filteredUsers.length > 0
              ? `Found ${filteredUsers.length} user${filteredUsers.length !== 1 ? 's' : ''}`
              : "No users found"
            }
          </p>
        </div>
      )}

      <div className="divider my-2 border-gray-600"></div>

      {/* Users List */}
      <div className="flex-1 overflow-hidden">
        <OtherUsers users={filteredUsers} />
      </div>

      {/* Logout Section */}
      <div className="mt-auto pt-4 border-t border-gray-600">
        <button 
          onClick={logoutHandler} 
          className="btn btn-sm w-full bg-white hover:bg-white text-black border-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
