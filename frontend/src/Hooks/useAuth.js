import { useDispatch } from "react-redux";
import { logUser, setUser } from "../Services/UserAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAuth = ({ endpoint }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 86400000),
    path: "/",
  };

  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/users/${endpoint}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        Cookies.set("jwt", response.data.token, cookieOptions);
        dispatch(setUser(response.data.user));
        dispatch(logUser(true));
        navigate("/");
        return response.data;
      }
      return null;
    },
  });
  return mutation
};

export default useAuth;
