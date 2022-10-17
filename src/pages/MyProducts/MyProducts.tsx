import React, { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import { api_url } from "../../configs/url.config";
import { routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProducts } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";

const MyProducts = () => {
  const productState = useAppSelector((state) => state.product);
  const userState = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productService.getSellerProducts();
        dispatch(setProducts(data));
      } catch (error) {}
    };
    getProducts();
  }, []);

  return (
    <div className="m-3">
      <h3 className="text-primary font-bold  underline-offset-1 text-xl">
        SATIŞA SUNDUĞUM ÜRÜNLER
      </h3>
      <div className="flex flex-row flex-wrap">
        {productState.products.map((product) => (
          <ProductCard product={product} editable />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
