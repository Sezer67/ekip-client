import React, { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import { gifs } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProducts } from "../../redux/productSlice/productSlice";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";

const MyProducts = () => {
  const productState = useAppSelector((state) => state.product);
  const loading = useAppSelector((state) => state.notification.isLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await productService.getSellerProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getProducts();
  }, []);
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="m-3">
      <h3 className="text-primary font-bold  underline-offset-1 text-xl">
        SATIŞA SUNDUĞUM ÜRÜNLER
      </h3>
      <div className="flex flex-row flex-wrap">
        {productState.products.map((product) => (
          <ProductCard product={product} key={product.id} editable />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
