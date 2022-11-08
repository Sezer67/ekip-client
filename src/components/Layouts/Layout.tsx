/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { setApiToken } from "../../axios.util";
import { gifs } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import Header from "./Header";
import MySider from "./MySider";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userState = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userState.user.token) {
      setApiToken(userState.user.token);
    }
  }, [userState.user.token]);
  return (
    <>
      <div className="w-full h-[100vh] max-h-[100vh]">
        <Header />
        <div className="w-full flex flex-row">
          <MySider />
          <div className="w-full m-3 max-h-[90vh] overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
