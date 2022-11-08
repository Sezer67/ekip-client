import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect } from "react";
import { axiosInstance } from "../../axios.util";
import { api_url } from "../../configs/url.config";
import { gifs, icons } from "../../constants";
import { Role, RoleText } from "../../enums/role.enum";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserType } from "../../redux/types/user.types";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import { setAllUsers, updateUserById } from "../../redux/userSlice/userSlice";
import { userService } from "../../service";
import { colors, RoleFilterStatus, textColors } from "./user.config";

const User = () => {
  const userState = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.notification.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await axiosInstance.get(`${api_url}/user/all`);
        dispatch(setAllUsers(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getAllUsers();
  }, [dispatch]);

  const handleFreeze = async (id: string, isFreeze: boolean) => {
    try {
      const { data } = await userService.updateUser(id, { isFreeze });
      dispatch(updateUserById({ id, isFreeze }));
    } catch (error) {
      throw error;
    }
  };

  const columns: ColumnsType<UserType> = [
    {
      title: "PP",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (value: string | null) => {
        const random = Math.floor(Math.random() * 3);
        return (
          <div
            className={`${colors[random]} w-8 h-8 rounded-full flex justify-center items-center ${textColors[random]}`}
          >
            {value ? (
              <img
                alt="img"
                src={value}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span>{userState.user.firstName.charAt(0).toUpperCase()}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
      render: (value: string) => (
        <span className="text-primary text-base font-semibold">{value}</span>
      ),
    },
    {
      title: "Ad Soyad",
      dataIndex: "firstName",
      key: "firstName",
      render: (value: string, record: UserType) => (
        <span className="text-primary text-base font-semibold">
          {value.concat(" ", record.lastName)}
        </span>
      ),
    },
    {
      title: "Mail",
      dataIndex: "email",
      key: "email",
      render: (value: string) => <span className="text-primary">{value}</span>,
    },
    {
      title: "Hesap Tipi",
      dataIndex: "role",
      key: "role",
      render: (value: Role) => (
        <div className="w-full flex justify-center items-center">
          <span
            className={`text-primary w-[80px] text-center px-2 py-1 border ${
              value === Role.Customer
                ? "bg-blue-200 border-blue-300 "
                : "bg-red-300 border-red-400"
            }`}
          >
            {RoleText[value as never]}
          </span>
        </div>
      ),
      filters: RoleFilterStatus,
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Bakiye",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => (
        <span className="text-primary">{value} ₺</span>
      ),
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-row">
          {record.isFreeze ? (
            <div
              onClick={() => handleFreeze(record.id, !record.isFreeze)}
              className="cursor-pointer w-6 h-6"
            >
              <Tooltip title="Hesabı Aktif Et">
                <img src={icons.not_freeze} alt="freeze" />
              </Tooltip>
            </div>
          ) : (
            <div
              onClick={() => handleFreeze(record.id, !record.isFreeze)}
              className="cursor-pointer w-6 h-6"
            >
              <Tooltip title="Hesabı Dondur">
                <img src={icons.freeze} alt="freeze" />
              </Tooltip>
            </div>
          )}
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="p-3">
      <div className="w-full">
        <Table
          locale={{
            triggerAsc: "Artan Sıralama",
            triggerDesc: "Azalan Sıralama",
            cancelSort: "Sıralamayı İptal Et",
            filterReset: false,
            filterConfirm: "Uygula",
          }}
          scroll={{ x: true }}
          className="w-full"
          columns={columns}
          dataSource={userState.allUsers}
        />
      </div>
    </div>
  );
};

export default User;
