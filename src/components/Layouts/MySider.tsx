import { Layout, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { pathEnum } from "../../enums";
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
      key: pathEnum.Path.HOME,
      icon: <img src={icons.product} alt="bla" className="" />,
      onClick: () => routeHelper.navigation(navigate, pathEnum.Path.HOME),
    },
    {
      label: "Satışlarım",
      key: pathEnum.Path.SALES,
      icon: <img src={icons.sales} alt="bla" />,
      onClick: () => routeHelper.navigation(navigate, pathEnum.Path.SALES),
    },
    {
      label: "Yeni Ürün",
      key: pathEnum.Path.NEW_PRODUCT,
      icon: <img src={icons.product_add} alt="bla" />,
      onClick: () =>
        routeHelper.navigation(navigate, pathEnum.Path.NEW_PRODUCT),
    },
    {
      label: "Ürünlerim",
      key: pathEnum.Path.MY_PRODUCT,
      icon: <img src={icons.product} alt="bla" />,
      onClick: () => routeHelper.navigation(navigate, pathEnum.Path.MY_PRODUCT),
    },
    {
      label: "Müşteri Siparişleri",
      key: pathEnum.Path.SELLER_ORDER,
      icon: <img src={icons.accept} alt="bla" />,
      onClick: () =>
        routeHelper.navigation(navigate, pathEnum.Path.SELLER_ORDER),
    },
  ];

  const customerMenuItem: ItemType[] = [
    {
      label: "Ürünler",
      key: pathEnum.Path.HOME,
      icon: <img src={icons.product} alt="bla" className="" />,
      onClick: () => routeHelper.navigation(navigate, pathEnum.Path.HOME),
    },
    {
      label: "Siparişlerim",
      key: pathEnum.Path.CUSTOMER_ORDER,
      icon: <img src={icons.shopping_bag} alt="" />,
      onClick: () =>
        routeHelper.navigation(navigate, pathEnum.Path.CUSTOMER_ORDER),
    },
    {
      label: "Favorilerim",
      key: "/my-favs",
      icon: <img src={icons.fill_favorite} alt="" />,
      onClick: () => routeHelper.navigation(navigate, "/my-favs"),
    },
    {
      label: "Bakiyem",
      key: pathEnum.Path.BALANCE,
      icon: <img src={icons.wallet} alt="" />,
      onClick: () => routeHelper.navigation(navigate, pathEnum.Path.BALANCE),
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
