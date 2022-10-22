import { Button, Checkbox, Drawer, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { api_url } from "../../configs/url.config";
import { icons } from "../../constants";
import { routeHelper } from "../../helpers";
import {
  useAppDispatch,
  useAppSelector,
  useAppWindowSize,
} from "../../redux/hooks";
import { CategoryType } from "../../redux/types/category.type";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { getProducts } from "../../service/product.service";
import { QueryProductType } from "../../types/product-service.type";
import { FormDataType, PropType, styles } from "./filter-drawer.config";

const FilterDrawer: React.FC<PropType> = ({
  setVisible,
  visible,
  title,
  setFilterProducts,
  setActiveTab,
}) => {
  const [isShowCount, setIsShowCount] = useState<boolean>(false);
  const [drawerWidth, setDrawerWidth] = useState<number>(500);
  const size = useAppWindowSize();

  const categoryState = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  const titleNode = (): React.ReactNode => {
    return <span className="text-white text-lg font-semibold">{title}</span>;
  };
  const closeIcon = (): React.ReactNode => {
    return <img src={icons.cancel} alt="icon" />;
  };

  const handleFinish = async (values: FormDataType) => {
    if (Number(values.startPrice) > Number(values.endPrice)) {
      dispatch(
        setNotification({
          isNotification: true,
          message: "Hatalı Değer",
          description: "Minimum Fiyat Maximum Fiyattan Yüksek Olamaz.",
          placement: "top",
          status: "error",
        })
      );
    } else {
      const data: QueryProductType = {};
      if (values.categories.length > 0) {
        let ids: string = "";
        values.categories.forEach((option, index) => {
          if (index === 0) {
            ids += option.value;
          } else {
            ids = ids + "," + option.value;
          }
        });
        data.categories = ids;
      }
      if (values.startPrice) data.startPrice = values.startPrice;
      if (values.endPrice) data.endPrice = values.endPrice;
      if (values.name) data.name = values.name;
      if (isShowCount) data.isShowCount = true;

      if (Object.keys(data).length > 0) {
        // işlem burada
        const queryUrl = routeHelper.addQueryToUrl(`${api_url}/product`, {
          categories: data.categories ? data.categories : "",
          startPrice: data.startPrice ? data.startPrice.toString() : "",
          endPrice: data.endPrice ? data.endPrice.toString() : "",
          name: data.name ? data.name : "",
          isShowCount: data.categories ? "true" : "",
        });
        try {
          const { data: products } = await getProducts(queryUrl);
          setFilterProducts(products);
          setActiveTab("Filtre");
        } catch (error) {
          console.log(error);
        }
      }
      setVisible(false);
    }
  };

  useEffect(() => {
    if (size.width < 500) {
      setDrawerWidth(320);
    }
  }, [size]);

  return (
    <Drawer
      closeIcon={closeIcon()}
      title={titleNode()}
      width={drawerWidth}
      onClose={() => setVisible(false)}
      visible={visible}
      headerStyle={styles.headerStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="İsme Göre Ara">
          <Input.Search autoComplete="off" />
        </Form.Item>
        <Form.Item name="categories" label="Kategori">
          <Select labelInValue mode="multiple">
            {categoryState.initialState.map((option) => (
              <Select.Option key={option.id}>{option.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex flex-row justify-start space-x-4 items-center">
          <Form.Item label="Min Fiyat" name="startPrice">
            <Input type="number" min={0} />
          </Form.Item>
          <span className="text-2xl">-</span>
          <Form.Item label="Max Fiyat" name="endPrice">
            <Input type="number" min={0} />
          </Form.Item>
        </div>
        <Form.Item name="showCount">
          <Checkbox onChange={(value) => setIsShowCount(value.target.checked)}>
            En Çok Tıklananlar
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Bas</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FilterDrawer;
