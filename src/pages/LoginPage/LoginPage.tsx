import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { gifs } from "../../constants";
const LoginPage = () => {
  const navigate = useNavigate();
  const handleNotAccount = () => {
    navigate("/register");
  };

  return (
    <div className="w-full h-[100vh] flex flex-row justify-around items-center">
      <div className="w-full shadow-shadow-right px-4 lg:px-0 lg:w-1/2 flex justify-center h-full lg:border-r border-r-primary">
        <Form
          layout="vertical"
          className="w-full   lg:w-1/2 flex flex-col justify-center items-center"
        >
          <Form.Item
            className=" lg:hidden"
            label="Ekip'e Hoşgeldiniz"
          ></Form.Item>
          <Form.Item label="Username | Email" className="w-full ">
            <Input />
          </Form.Item>
          <Form.Item label="Password" className="w-full">
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
