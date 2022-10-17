import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { imageHelper, routeHelper } from "../../helpers";
import { useAppDispatch } from "../../redux/hooks";
import { setSelectedProduct } from "../../redux/productSlice/productSlice";
import { ProductStateType } from "../../redux/types/product.type";

type PropsType = {
  product: ProductStateType;
  editable?: boolean;
};

const ProductCard: React.FC<PropsType> = ({ product, editable }) => {
  const imgsrc = product.images && imageHelper.getBase64(product.images[0]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    routeHelper.navigation(navigate, `/product/edit/${product.id}`);
    dispatch(setSelectedProduct(product));
  };

  const handleFavorite = () => {};
  const handleShow = () => {
    routeHelper.navigation(navigate, `product/${product.id}`);
    dispatch(setSelectedProduct(product));
  };
  return (
    <div className="relative min-w-48 w-56 max-h-60 shadow-md bg-white p-3 m-3 rounded-md  flex flex-col justify-around cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div
        onClick={editable ? handleEdit : handleFavorite}
        className="absolute shadow-md -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center"
      >
        <img src={editable ? icons.edit : icons.empty_favorite} alt="fav" />
      </div>
      <div className="flex justify-center mb-6 w-full">
        {imgsrc ? (
          <img
            src={imgsrc}
            alt="asd"
            className=" hover:scale-125 hover:shadow-md hover:rounded-md mt-1 transition-all duration-300"
          />
        ) : (
          <span className="text-red-700 italic ">
            Ürüne ait bir resim mevcut değil.
          </span>
        )}
      </div>
      <div onClick={handleShow} className="flex flex-col mb-3">
        <span className="text-orange font-semibold text-lg  cursor-pointer">
          {product.name}
        </span>
        <div className="flex flex-row flex-wrap items-center justify-between">
          <span className="text-secondary font-semibold text-lg">
            {product.price} ₺
          </span>
          {product.stock < 20 && (
            <span className="text-thirdy text-xs">
              Kalan Stok: {product.stock}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
