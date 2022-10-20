import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { pathEnum, roleEnum } from "../../enums";
import { imageHelper, routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setProductShowCountById,
  setSelectedProduct,
} from "../../redux/productSlice/productSlice";
import { ProductStateType } from "../../redux/types/product.type";
import { productService } from "../../service";

type PropsType = {
  product: ProductStateType;
  editable?: boolean;
};

const ProductCard: React.FC<PropsType> = ({ product, editable }) => {
  const userState = useAppSelector((state) => state.user);
  const imgsrc = product.images && imageHelper.getBase64(product.images[0]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    routeHelper.navigation(
      navigate,
      `${pathEnum.Path.PRODUCT_EDIT_QUERY_ID}/${product.id}`
    );
    dispatch(setSelectedProduct(product));
  };

  const handleFavorite = () => {};
  const handleShow = async () => {
    // product showCount güncellemesi eğer editable ise değişmeyecek
    // yani satıcı kendi ürününü görüntüleyince görüntülenme sayısı artmayacak
    if (!editable) {
      try {
        await productService.updateProductById(product.id, { showCount: 1 });
        dispatch(setProductShowCountById({ id: product.id }));
      } catch (error) {
        console.log(error);
      }
    }
    routeHelper.navigation(navigate, `/product/${product.id}`);
    dispatch(setSelectedProduct(product));
  };
  return (
    <div className="relative min-w-48 w-56 max-h-60 shadow-md bg-white p-3 m-3 rounded-md  flex flex-col justify-around cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div
        onClick={editable ? handleEdit : handleFavorite}
        className={`absolute shadow-md -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center ${
          !editable && userState.user.role !== roleEnum.Role.Customer
            ? "hidden"
            : ""
        } `}
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
