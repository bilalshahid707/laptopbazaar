import "./App.css";
import { useState } from "react";
import { Header, Footer } from "./imports";
import { AllRoutes, Loader } from "./imports";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logUser, setUser } from "./Services/UserAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function App() {
  const cookie = Cookies.get("jwt");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 3000);
  
  const { data, isSuccess } = useQuery({
    queryKey: ["userdata", cookie],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/users/setuserdata`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      return response.data;
    },
    enabled:cookie!==undefined
  });
  useEffect(() => {
    if (cookie) {
      dispatch(logUser(true));
      if (isSuccess) {
        dispatch(setUser(data.data));
      }
    }
  }, [cookie, isSuccess]);
  return (
    <>
      {loader ? (
        <div className="custom-flex flex-col h-[100vh] loader">
          <img
            className="w-56 h-56 animate-pulse"
            src="/assets/logo-main.png"
            alt=""
          />
        </div>
      ) : (
        ""
      )}
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;
