/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, Menu } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../service/user.sevice";
import * as userSlice from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { routeHelper, storageHelper } from "../../helpers";
import { RoleTexts } from "./text";
const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userState = useAppSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userSlice.logout(""));
      storageHelper.setKeyWithValue("token", "");
      routeHelper.navigation(navigate, "/login");
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          label: "Profile",
          key: 0,
          onClick: () => routeHelper.navigation(navigate, "/profile"),
        },
        {
          label: "Log Out",
          key: 1,
          onClick: handleLogout,
        },
      ]}
    />
  );
  return (
    <>
      <div className="w-full h-[7vh] bg-primary shadow-lg">
        <div className="w-full h-full flex justify-between items-center px-5">
          <h1 className="text-light m-0">EKIP</h1>
          <div className="flex flex-row space-x-3 items-center">
            <span className="text-light">
              {RoleTexts[userState.user.role]} Hesabı
            </span>
            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <button
                style={{ padding: 0, border: "none" }}
                className="flex flex-row items-center"
              >
                <div className="w-8 h-8 rounded-full bg-pink mr-4 flex justify-center items-center">
                  {userState.user.profilePicture !== null ? (
                    <img
                      src={userState.user.profilePicture}
                      alt="pic"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {userState.user.firstName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-pink">
                  {userState.user.firstName.concat(
                    " ",
                    userState.user.lastName
                  )}
                </span>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
