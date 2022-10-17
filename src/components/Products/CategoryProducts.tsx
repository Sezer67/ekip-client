import React, { useEffect } from "react";
import { api_url } from "../../configs/url.config";
import { routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProducts } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";
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

  return (
    <div className="px-4 flex flex-row flex-wrap">
      {products.length > 0
        ? products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        : null}
    </div>
  );
};

export default CategoryProducts;
