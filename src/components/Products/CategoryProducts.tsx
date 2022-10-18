import { Empty } from "antd";
import React, { useEffect } from "react";
import { icons } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PropsType } from "./category-product.config";
import ProductCard from "./ProductCard";

const CategoryProducts: React.FC<PropsType> = ({ products }) => {
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const getProducts = async () => {
    //   const joinIds = categoryId.join(",");
    //   const queryUrl = routeHelper.addQueryToUrl(`${api_url}/product`, {
    //     categories: joinIds,
    //   });
    //   try {
    //     const { data } = await productService.getProducts(queryUrl);
    //     dispatch(setProducts(data));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getProducts();
    // seklmelerde 1 er kez gezinip tüm bu componentler renderlanınca her değişimde hepsi tekrar render lanıyor.
  }, [dispatch]);

  if (products.length < 1) {
    <div className="mt-5 flex justify-center">
      <Empty
        description="Ürün Yok"
        image={icons.empty}
        imageStyle={{ width: "64px", height: "64px" }}
        style={{ fontSize: "16px", fontWeight: "700" }}
      />
    </div>;
  }

  return (
    <div className="px-4 flex flex-row flex-wrap">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
};

export default CategoryProducts;
