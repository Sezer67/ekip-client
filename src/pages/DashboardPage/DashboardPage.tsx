import { Button, Dropdown, Menu, Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";
import CategoryProducts from "../../components/Products/CategoryProducts";
import HomeProducts from "../../components/Products/HomeProducts/HomeProducts";
import { api_url } from "../../configs/url.config";
import { routeHelper, sorterHelper } from "../../helpers";
import { setCategory } from "../../redux/categorySlice/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProducts } from "../../redux/productSlice/productSlice";
import { ProductStateType } from "../../redux/types/product.type";
import { categoryService, productService } from "../../service";
import { ProductKeysType } from "../../types/product-service.type";
type PositionType = "right";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Anasayfa");
  const [trendProducts, setTrendProducts] = useState<ProductStateType[]>([]);
  const [newProducts, setNewProducts] = useState<ProductStateType[]>([]);
  const [bestSales, setBestSales] = useState<ProductStateType[]>([]);
  const [filterProducts, setFilterProducts] = useState<ProductStateType[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const categoryState = useAppSelector((state) => state.category.initialState);
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const position: PositionType[] = ["right"];
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await categoryService.getCategories();
        dispatch(setCategory(data));
      } catch (error) {
        console.log(error);
      }
    };
    const getTrendProducts = async () => {
      try {
        const { data } = await productService.getTrendProducts();
        setTrendProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getNewProducts = async () => {
      try {
        const { data } = await productService.getNewProducts();
        setNewProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getNewProducts();
    getTrendProducts();
  }, [dispatch]);

  useEffect(() => {
    const url = routeHelper.addQueryToUrl("", {
      tab: activeTab !== "Anasayfa" ? activeTab : "",
    });
    routeHelper.navigation(navigate, url);
    const categoryId = categoryState.find(({ name }) => name === activeTab)?.id;

    const getProducts = async (id: string) => {
      // const joinIds = id.join(",");
      const queryUrl = routeHelper.addQueryToUrl(`${api_url}/product`, {
        categories: id,
      });
      try {
        const { data } = await productService.getProducts(queryUrl);
        dispatch(setProducts(data));
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getProducts(categoryId);
    }
  }, [activeTab]);

  const handleSort = (sort: "ASC" | "DESC", key: ProductKeysType) => {
    if (activeTab === "Filtre") {
      const result = sorterHelper.sorter(key, filterProducts, sort);
      setFilterProducts(result);
    } else {
      const result = sorterHelper.sorter(key, productState.products, sort);
      dispatch(setProducts(result));
    }
  };

  const menu = (
    <Menu
      selectable
      items={[
        {
          key: 1,
          label: "Artan Fiyat",
          onClick: () => handleSort("ASC", "price"),
        },
        {
          key: 2,
          label: "Azalan Fiyat",
          onClick: () => handleSort("DESC", "price"),
        },
        {
          key: 3,
          label: "En Yeniler",
        },
        {
          key: 4,
          label: "En çok Tıklanma",
          onClick: () => handleSort("DESC", "showCount"),
        },
      ]}
    />
  );

  const OperationsSlot: Record<PositionType, React.ReactNode> = {
    right: (
      <div className="flex flex-row space-x-3">
        {activeTab !== "Anasayfa" && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>Sırala</Button>
          </Dropdown>
        )}
        <Button onClick={() => setDrawerVisible(true)}>Ara</Button>
      </div>
    ),
  };

  const slot = useMemo(() => {
    if (position.length === 0) return null;

    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [activeTab, productState.products]);
  return (
    <div className="w-full px-4">
      <Tabs
        tabBarExtraContent={slot}
        activeKey={activeTab}
        onChange={(e) => setActiveTab(e)}
      >
        <Tabs.TabPane tab="Anasayfa" key="Anasayfa">
          <div className="flex flex-col">
            <div className="flex flex-row pl-3">
              <div className="border-b-2 border-thirdy w-6 " />
              <span className="border-2 border-b-0 border-thirdy px-3 pb-1  mb-0 w-auto rounded-t-md pt-2 font-semibold text-primary">
                Trend Ürünler
              </span>
              <div className="border-b-2 border-thirdy  w-3/4 " />
            </div>
            <HomeProducts products={trendProducts} key="trend" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row pl-3  shadow-secondary">
              <div className="border-b-2 border-thirdy w-6 " />
              <span className="border-2 border-b-0 border-thirdy px-3 pb-1  mb-0 w-auto rounded-t-md pt-2 font-semibold text-primary">
                En Yeni Ürünler
              </span>
              <div className="border-b-2  border-thirdy  w-3/4 " />
            </div>
            <HomeProducts products={newProducts} key="new" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row pl-3  shadow-secondary">
              <div className="border-b-2 border-thirdy w-6 " />
              <span className="border-2 border-b-0 border-thirdy px-3 pb-1  mb-0 w-auto rounded-t-md pt-2 font-semibold text-primary">
                En Çok Satılan Ürünler
              </span>
              <div className="border-b-2  border-thirdy  w-2/3 " />
            </div>
            <HomeProducts products={newProducts} key="new" />
          </div>
        </Tabs.TabPane>

        {categoryState.map((category) => {
          return (
            <Tabs.TabPane tab={category.name} key={category.name}>
              <CategoryProducts
                products={productState.products}
                key={category.id}
              />
            </Tabs.TabPane>
          );
        })}
        {filterProducts.length > 0 && (
          <Tabs.TabPane tab="Filtre" key="Filtre">
            <CategoryProducts key="Filter" products={filterProducts} />
          </Tabs.TabPane>
        )}
      </Tabs>
      <FilterDrawer
        title="Ürün Filtreleme"
        setVisible={setDrawerVisible}
        visible={drawerVisible}
        setFilterProducts={setFilterProducts}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default DashboardPage;
