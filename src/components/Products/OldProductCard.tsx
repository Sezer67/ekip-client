import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { pathEnum, roleEnum } from "../../enums";
import { Role } from "../../enums/role.enum";
import { imageHelper, routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addFavorite,
  removeFavorite,
  setProductShowCountById,
  setSelectedProduct,
} from "../../redux/productSlice/productSlice";
import { ProductStateType } from "../../redux/types/product.type";
import { productService } from "../../service";

type PropsType = {
  product: ProductStateType;
  editable?: boolean;
};

const OldProductCard: React.FC<PropsType> = ({ product, editable }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const userState = useAppSelector((state) => state.user);
  const productState = useAppSelector((state) => state.product);
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

  const handleFavorite = async () => {
    try {
      if (!isFavorite) {
        const { data } = await productService.addProduuctToFavorites({
          productId: product.id,
        });
        dispatch(addFavorite(data));
        setIsFavorite(true);
      } else {
        await productService.removeProductToFavorites(product.id);
        dispatch(removeFavorite({ id: product.id }));
      }
    } catch (error) {}
  };
  const handleShow = async () => {
    // product showCount güncellemesi eğer editable ise değişmeyecek
    // yani satıcı kendi ürününü görüntüleyince görüntülenme sayısı artmayacak
    if (userState.user.role === roleEnum.Role.Customer) {
      try {
        await productService.updateProductById(product.id, { showCount: 1 });
        dispatch(setProductShowCountById({ id: product.id }));
      } catch (error) {
        console.log(error);
      }
    }
    routeHelper.navigation(navigate, `/product/${product.id}`);
    dispatch(setSelectedProduct(product)); // favorite patlatıyor
  };

  useEffect(() => {
    if (userState.user.role !== Role.Customer && !productState.favorites)
      return;
    const isFav = productState.favorites.find(
      (favorite) => favorite.productId.id === product.id
    );
    setIsFavorite(!!isFav);
  }, [product, productState.favorites, userState]);

  return (
    <div className="relative min-w-[12rem] w-56 max-h-60 shadow-md bg-white p-3 m-3 rounded-md  flex flex-col justify-around cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div
        onClick={editable ? handleEdit : handleFavorite}
        className={`absolute shadow-md -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center ${
          !editable && userState.user.role !== roleEnum.Role.Customer
            ? "hidden"
            : ""
        } `}
      >
        <img
          src={
            editable
              ? icons.edit
              : isFavorite
              ? icons.fill_favorite
              : icons.empty_favorite
          }
          alt="fav"
        />
      </div>
      <div className="flex justify-center mb-6 w-full">
        {imgsrc ? (
          <img
            src={imgsrc}
            alt="asd"
            className="max-w-[200px] max-h-[100px] hover:scale-125 hover:shadow-md hover:rounded-md mt-1 transition-all duration-300"
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

export default OldProductCard;
