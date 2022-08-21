import { Layout, Menu } from "antd";
import React, { useState } from "react";
import icons from "../../constants/icons";
import { useAppSelector } from "../../redux/hooks";

const MySider = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);
  //  <div className='h-[93vh] w-[200px] bg-pink shadow-lg shadow-pink'>

  return (
    <Layout.Sider
      className="h-[93vh] !bg-pink"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex justify-center items-center py-4 border-b border-primary "
      >
        <img
          className="w-6 h-6 "
          src={collapsed ? icons.left_arrow : icons.right_arrow}
          alt="icon"
        />
      </button>
      <Menu 
        mode="inline"
        defaultSelectedKeys={['1']}
        // ekipleri gösterilecek
        />
    </Layout.Sider>
  );
};

export default MySider;
