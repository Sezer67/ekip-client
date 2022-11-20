import { Button, Form, Input, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../enums/path.enum";
import { Role, RoleText } from "../../enums/role.enum";
import { useAppDispatch } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { register } from "../../service/user.sevice";
import {
  FormValuesEnum,
  FormValuesType,
  errorMessages,
} from "./register-page.config";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleOnFinish = async (values: FormValuesType) => {
    try {
      const { data } = await register(values);
      navigate(Path.LOGIN);
    } catch (error: any) {
      debugger;
      dispatch(
        setNotification({
          message: "Kayıt Başarısız",
          description: error.response.data.description,
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
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
              label="Ad"
              name={FormValuesEnum.firstName}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Ad"),
                },
              ]}
            >
              <Input size="middle" placeholder="Sezer" type="text" />
            </Form.Item>
            <Form.Item
              label="Soyad"
              name={FormValuesEnum.lastName}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Soyad"),
                },
              ]}
            >
              <Input size="middle" placeholder="Kenar" />
            </Form.Item>
            <Form.Item
              label="Kullanıcı Adı"
              name={FormValuesEnum.username}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Userame"),
                },
              ]}
            >
              <Input size="middle" />
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
              <Input size="middle" />
            </Form.Item>
            <Form.Item label="Hesap Türü" name={FormValuesEnum.role} initialValue={Role.Customer} rules={[
                {
                  required: true,
                  message: errorMessages.required("Hesap Türü"),
                },
              ]}>
              <Radio.Group optionType="button" buttonStyle="solid">
                <Radio.Button value={Role.Customer}>{RoleText.customer}</Radio.Button>
                <Radio.Button value={Role.Seller}>{RoleText.seller}</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={FormValuesEnum.password}
              rules={[
                {
                  required: true,
                  message: errorMessages.required("Şifre"),
                },
              ]}
            >
              <Input.Password size="middle" />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button htmlType="submit" size="large" type="primary">
                Kayıt Ol
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
