import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { gifs } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../service/user.sevice";
import { UserLoginType } from "../../types/user-service.types";
import { FormValuesEnum } from "./login-page.config";
import * as userSlice from "../../redux/userSlice/userSlice";
import { setApiToken } from "../../axios.util";
import { routeHelper, storageHelper } from "../../helpers";
import { pathEnum } from "../../enums";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { Role } from "../../enums/role.enum";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userState.user.token) navigate(pathEnum.Path.HOME);
  }, [navigate, userState]);

  const handleNotAccount = () => {
    navigate(pathEnum.Path.REGISTER);
  };

  const handleOnFinish = async (values: UserLoginType) => {
    if (values.username?.includes("@")) {
      values.email = values.username;
      delete values.username;
    }
    try {
      const { data } = await login(values);
      dispatch(userSlice.setUser(data));
      if (data.token) {
        setApiToken(data.token);
        storageHelper.setKeyWithValue("token", data.token);
      }
      debugger;
      if (data.role === Role.Admin) {
        routeHelper.navigation(navigate, pathEnum.Path.USERS);
      } else {
        navigate(pathEnum.Path.HOME);
      }
      dispatch(
        setNotification({
          message: "Heyy !",
          description: "Hoşgeldin :)",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "Opppsss",
          description: error.response.data.description,
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-row justify-around items-center">
      <div className="w-full shadow-shadow-right px-4 lg:px-0 lg:w-1/2 flex justify-center h-full lg:border-r border-r-primary">
        <Form
          layout="vertical"
          className="w-full lg:w-1/2 flex flex-col justify-center items-center"
          onFinish={handleOnFinish}
        >
          <Form.Item
            className=" lg:hidden"
            label="Ekip'e Hoşgeldiniz"
          ></Form.Item>
          <Form.Item
            name={FormValuesEnum.username}
            label="Kullanıcı Adı | Email"
            className="w-full"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={FormValuesEnum.password}
            label="Şifre"
            className="w-full"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="w-full flex justify-end">
            <Button type="link" onClick={handleNotAccount}>
              Henüz bir hesabım yok.
            </Button>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>

      <img
        className="hidden lg:block lg:w-1/2 mx-4 "
        src={gifs.logogif}
        alt=""
      />
    </div>
  );
};

export default LoginPage;
