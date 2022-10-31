import { Table } from "antd";
import React, { useEffect } from "react";
import { axiosInstance } from "../../axios.util";
import { api_url } from "../../configs/url.config";

const User = () => {
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axiosInstance.get(`${api_url}/user/all`);
      debugger;
    };
    getAllUsers();
  }, []);

  return (
    <div className="p-3">
      <div className="w-full">
        <Table />
      </div>
    </div>
  );
};

export default User;
