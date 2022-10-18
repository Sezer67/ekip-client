import { Layout, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { Role } from "../../enums/role.enum";
import { routeHelper } from "../../helpers";
import { useAppSelector } from "../../redux/hooks";

const MySider = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const sellerMenuItem: ItemType[] = [
    {
      label: "Ürünler",
      key: "/",
      icon: <img src={icons.product} alt="bla" className="" />,
      onClick: () => routeHelper.navigation(navigate, "/"),
    },
    {
      label: "Satışlarım",
      key: "/sales",
      icon: <img src={icons.sales} alt="bla" />,
    },
    {
      label: "Yeni Ürün",
      key: "/new-product",
      icon: <img src={icons.product_add} alt="bla" />,
      onClick: () => routeHelper.navigation(navigate, "/new-product"),
    },
    {
      label: "Ürünlerim",
      key: "/my-products",
      icon: <img src={icons.product} alt="bla" />,
      onClick: () => routeHelper.navigation(navigate, "/my-products"),
    },
    {
      label: "Müşteri Siparişleri",
      key: "/my-customer-orders",
      icon: <img src={icons.accept} alt="bla" />,
      onClick: () => routeHelper.navigation(navigate, "/my-customer-orders"),
    },
  ];

  const customerMenuItem: ItemType[] = [
    {
      label: "Ürünler",
      key: "/",
      icon: <img src={icons.product} alt="bla" className="" />,
      onClick: () => routeHelper.navigation(navigate, "/"),
    },
    {
      label: "Siparişlerim",
      key: "/my-orders",
      icon: <img src={icons.shopping_bag} alt="" />,
      onClick: () => routeHelper.navigation(navigate, "/my-orders"),
    },
    {
      label: "Favorilerim",
      key: "/my-favs",
      icon: <img src={icons.fill_favorite} alt="" />,
      onClick: () => routeHelper.navigation(navigate, "/my-favs"),
    },
    {
      label: "Bakiyem",
      key: "/my-balance",
      icon: <img src={icons.wallet} alt="" />,
      onClick: () => routeHelper.navigation(navigate, "/my-balance"),
    },
  ];

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
          src={!collapsed ? icons.left_arrow : icons.right_arrow}
          alt="icon"
        />
      </button>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        items={
          userState.user.role === Role.Seller
            ? sellerMenuItem
            : userState.user.role === Role.Customer
            ? customerMenuItem
            : []
        }
        className="!bg-transparent !text-lg space-y-3"
      />
    </Layout.Sider>
  );
};

export default MySider;
