/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, Menu } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../service/user.sevice";
import * as userSlice from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { convertHelper, routeHelper, storageHelper } from "../../helpers";
import { RoleTexts } from "./text";
import { Path } from "../../enums/path.enum";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import {
  setBestSaleProducts,
  setNewProducts,
  setSelectedProduct,
  setTrendProducts,
} from "../../redux/productSlice/productSlice";
import { productService } from "../../service";
const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userState = useAppSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userSlice.logout(""));
      
      storageHelper.setKeyWithValue("token", "");
      routeHelper.navigation(navigate, Path.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          label: "Profil",
          key: 0,
          onClick: () => routeHelper.navigation(navigate, Path.PROFILE),
        },
        {
          label: "Çıkış Yap",
          key: 1,
          onClick: handleLogout,
        },
      ]}
    />
  );

  useEffect(() => {
    const getTrendProducts = async () => {
      try {
        const { data } = await productService.getTrendProducts();
        dispatch(setTrendProducts(data));
      } catch (error) {
        console.log(error);
      }
    };

    const getNewProducts = async () => {
      try {
        const { data } = await productService.getNewProducts();
        dispatch(setNewProducts(data));
      } catch (error) {
        console.log(error);
      }
    };

    const bestSalesProducts = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await productService.getBestSalesProducts();
        const convertedProducts =
          convertHelper.convertBestSalesResponseToProducts(data);
        dispatch(setBestSaleProducts(convertedProducts));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getNewProducts();
    getTrendProducts();
    bestSalesProducts();
  }, []);

  return (
    <>
      <div className="w-full h-[7vh] bg-primary shadow-lg">
        <div className="w-full h-full flex justify-between items-center px-5">
          <h1
            onClick={() => {
              routeHelper.navigation(navigate, Path.HOME);
            }}
            className="text-light m-0"
          >
            EKIP
          </h1>
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
