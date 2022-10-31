import React, { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFavorites } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";

const Favorite = () => {
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <div className="p-3">
      <h3 className="text-xl text-primary font-bold">FAVORİ ÜRÜNLERİNİZ</h3>
      <div className="w-full flex flex-row">
        {productState.favorites &&
          productState.favorites.map((fav) => (
            <ProductCard product={fav.productId} key={fav.id} />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
