/* eslint-disable react-hooks/exhaustive-deps */
import { notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setApiToken } from "../../axios.util";
import { useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import Header from "./Header";
import MySider from "./MySider";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userState = useAppSelector((state) => state.user);
  const notificationState = useAppSelector((state) => state.notification);

  const dispatch = useDispatch();

  const openNotification = () => {
    notification[notificationState.status]({
      message: notificationState.message,
      description: notificationState.description,
      placement: notificationState.placement,
    });
    dispatch(
      setNotification({
        description: "",
        message: "",
        status: "success",
        isNotification: false,
        placement: "top",
      })
    );
  };

  useEffect(() => {
    if (notificationState.isNotification) openNotification();
  }, [notificationState.isNotification]);
  useEffect(() => {
    console.log("useffecnt");
    if (userState.user.token) {
      console.log("useEffect in if");
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
