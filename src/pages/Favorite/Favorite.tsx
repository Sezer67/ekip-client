import React from "react";
import ProductCard from "../../components/Products/ProductCard";
import { useAppSelector } from "../../redux/hooks";

const Favorite = () => {
  const productState = useAppSelector((state) => state.product);

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
