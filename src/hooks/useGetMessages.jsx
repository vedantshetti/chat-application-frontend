// hooks/useGetMessages.js
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser._id}`
        );
        
        console.log("Messages API Response:", res.data);
        
        // Fix: Extract only the messages array
        if (res.data.success && res.data.data) {
          dispatch(setMessages(res.data.data)); // This should be an array
        } else {
          dispatch(setMessages([]));
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
        dispatch(setMessages([]));
      }
    };
    
    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
