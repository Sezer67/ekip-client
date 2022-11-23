import { Button, Rate } from "antd";
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

const ProductCard: React.FC<PropsType> = ({ product, editable }) => {
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
    <div className="relative min-w-[17rem]  w-80 shadow-md bg-white p-3 m-3 rounded-md  flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div
        onClick={editable ? handleEdit : handleFavorite}
        className={`absolute top-1 right-1 w-8 h-8 bg-white rounded-full flex justify-center items-center ${
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
          className="w-4 h-4"
          alt="fav"
        />
      </div>
      <div className="flex h-[100px] justify-center mb-1 w-full border-b">
        {imgsrc ? (
          <img
            src={imgsrc}
            alt="asd"
            className="w-full object-contain max-h-[100px] "
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
        {product.ownerId ? (
          <span className="text-thirdy text-[.65rem] italic mb-2">
            {product.ownerId?.firstName.concat(" ", product.ownerId?.lastName)}{" "}
            tarafından
          </span>
        ) : null}
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
        <div className="flex flex-row items-center justify-between flex-wrap">
          <div className="flex flex-row items-center">
            <Rate allowHalf disabled defaultValue={product.ratingPoint} />
            <span className="pt-1 ml-2 text-thirdy">
              ({product.ratingCount})
            </span>
          </div>
          <Button
            onClick={handleShow}
            className="hover:!bg-blue-400 hover:!text-light"
          >
            Görüntüle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
