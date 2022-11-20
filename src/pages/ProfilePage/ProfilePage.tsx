import { Button, Form, Input, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { icons } from "../../constants";
import { roleEnum } from "../../enums";
import { imageHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { setUser } from "../../redux/userSlice/userSlice";
import { userService } from "../../service";
import { UserUpdateType } from "../../types/user-service.types";
import { formDatas, FormValuesType, roleValues } from "./profile-page.config";

const ProfilePage = () => {
  const userState = useAppSelector((state) => state.user);

  const [dataUri, setDataUri] = useState<string | null>(
    userState.user.profilePicture
  );

  const dispatch = useAppDispatch();

  const handleChangeProfilePicture = async (selectFile: File) => {
    // const buffer = new Uint8Array(await selectFile.arrayBuffer());
    try {
      const dataUrl = await imageHelper.fileToDataUri(selectFile);
      setDataUri(dataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (values: FormValuesType) => {
    const formData: UserUpdateType = {
      profilePicture: dataUri,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    try {
      const { data } = await userService.updateUser(
        userState.user.id,
        formData
      );
      dispatch(setUser(data));
      dispatch(
        setNotification({
          isNotification: true,
          description: "Güncelleme işlemi başarılı",
          message: "Success",
          placement: "top",
          status: "success",
        })
      );
    } catch (error) {}
  };

  return (
    <div className="m-3">
      <div className="flex justify-start items-center">
        <div className="relative">
          <div className="w-52 h-52 rounded-full bg-pink flex justify-center items-center">
            <img
              src={dataUri ? dataUri : icons.user}
              alt="user-icon"
              className={`${
                dataUri ? "w-52 h-52" : ""
              }  rounded-full object-cover`}
            />
          </div>
          <Tooltip placement="bottom" title="change profile picture">
            <div className="absolute right-5 bottom-2 w-10 h-10  bg-light rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={icons.image}
                alt="add-icon"
                className="cursor-pointer"
              />
              <input
                onChange={(e) => {
                  if (e.target.files)
                    handleChangeProfilePicture(e.target.files[0]);
                }}
                type="file"
                alt=""
                title=""
                accept="image/png, image/jpeg"
                className="absolute opacity-0 w-10 h-10  bg-light rounded-full cursor-pointer"
              />
            </div>
          </Tooltip>
        </div>
        <div className="ml-3 sm:ml-6 p-4 border ">
          <span>
            {userState.user.firstName
              .toUpperCase()
              .concat(" ", userState.user.lastName.toUpperCase())}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row flex-wrap space-x-3">
        <div className="w-full md:w-1/2 mt-4 max-w-lg">
          <Form
            name="user"
            initialValues={{
              firstName: userState.user.firstName,
              lastName: userState.user.lastName,
              email: userState.user.email,
              role: roleEnum.RoleText[userState.user.role as never],
              username: userState.user.username,
            }}
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Form.Item
              label={formDatas.names.firstName.label}
              name={formDatas.names.firstName.name}
              rules={[
                { required: true, message: formDatas.rules.firstName.message },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={formDatas.names.lastName.label}
              name={formDatas.names.lastName.name}
              rules={[
                { required: true, message: formDatas.rules.lastName.message },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={formDatas.names.email.label}
              name={formDatas.names.email.name}
              rules={[
                { required: true, message: formDatas.rules.email.message },
                { type: "email", message: formDatas.rules.email.typeMessage },
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label={formDatas.names.username.label}
              name={formDatas.names.username.name}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label={formDatas.names.role.label}
              name={formDatas.names.role.name}
            >
              <Input disabled />
              {/* <Select defaultValue={userState.user.role}>
                {roleValues.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select> */}
            </Form.Item>
            <Form.Item className="w-full flex justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
