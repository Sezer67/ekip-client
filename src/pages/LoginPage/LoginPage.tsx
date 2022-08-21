import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { gifs } from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../service/user.sevice";
import { UserLoginType } from "../../types/user-service.types";
import { FormValuesEnum } from "./login-page.config";
import * as userSlice from "../../redux/userSlice/userSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNotAccount = () => {
    navigate("/register");
  };

  const handleOnFinish = async (values: UserLoginType) => {
    if (values.username?.includes("@")) {
      values.email = values.username;
      delete values.username;
    }
    try {
      const { data } = await login(values);
      dispatch(userSlice.setUser(data));
      navigate("/");
    } catch (error) {
      console.log(error);
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
            label="Username | Email"
            className="w-full"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={FormValuesEnum.password}
            label="Password"
            className="w-full"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="w-full flex justify-end">
            <Button type="link" onClick={handleNotAccount}>
              Henüz bir hesabım yok.
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
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
