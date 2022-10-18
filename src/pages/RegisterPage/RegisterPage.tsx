import { Button, Form, Input, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/user.sevice";
import {
  FormValuesEnum,
  FormValuesType,
  errorMessages,
} from "./register-page.config";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnFinish = async (values: FormValuesType) => {
    try {
      const { data } = await register(values);
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="relative w-full h-full">
      <div className="h-full flex justify-center items-center">
        <div className="w-full mx-6 sm:mx-0 sm:w-1/2 z-10 flex justify-center items-center p-6 border border-primary rounded-md shadow-lg shadow-pink">
          <Form
            className="w-full"
            layout="vertical"
            name="register"
            onFinish={handleOnFinish}
          >
            <Form.Item
              label="First Name"
              name={FormValuesEnum.firstName}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("First Name"),
                },
              ]}
            >
              <Input size="middle" placeholder="Jessica" type="text" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name={FormValuesEnum.lastName}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Last Name"),
                },
              ]}
            >
              <Input size="middle" placeholder="Ivanov" />
            </Form.Item>
            <FormItem label="Gender" name={FormValuesEnum.gender}>
              <Radio.Group>
                <Radio value="female"> Female </Radio>
                <Radio value="male"> Male </Radio>
              </Radio.Group>
            </FormItem>
            <Form.Item
              label="Username"
              name={FormValuesEnum.username}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Userame"),
                },
              ]}
            >
              <Input size="middle" placeholder="username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name={FormValuesEnum.email}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Email"),
                },
                {
                  type: "email",
                  message: errorMessages.types.email,
                },
              ]}
            >
              <Input size="middle" placeholder="email@mail.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name={FormValuesEnum.password}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Password"),
                },
              ]}
            >
              <Input.Password size="middle" placeholder="password" />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button htmlType="submit" size="large" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-pink circle centerC " />
      </div>
      <div className="bg-secondary circle -right-[250px] -top-[250px] " />
      <div className="bg-primary circle -left-[250px] -top-[250px]" />
    </div>
  );
};

export default RegisterPage;
