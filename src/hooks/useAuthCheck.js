// hooks/useAuthCheck.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user/profile`);
        if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
        }
      } catch (error) {
        console.log("Not authenticated");
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [dispatch]);

  return isChecking;
};

export default useAuthCheck;
