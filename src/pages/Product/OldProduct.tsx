import { Button, InputNumber, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { convertHelper, imageHelper, routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addOrder,
  setProducts,
  setSelectedProduct,
} from "../../redux/productSlice/productSlice";
import { productService, userService } from "../../service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productsSliderSettings } from "./product.config";
import ProductCard from "../../components/Products/ProductCard";
import { api_url } from "../../configs/url.config";
import {
  setIsLoading,
  setNotification,
} from "../../redux/userSlice/notificationSlice";
import { pathEnum, roleEnum } from "../../enums";
import {
  addFollower,
  setUserMinusBalance,
} from "../../redux/userSlice/userSlice";
import { gifs, icons } from "../../constants";
import { Role } from "../../enums/role.enum";

const Product = () => {
  const productState = useAppSelector((state) => state.product);
  const categoryState = useAppSelector((state) => state.category);
  const userState = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.notification.isLoading);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [piece, setPiece] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<string>(
    (1 * productState.selectedProduct.price).toString()
  );

  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProductById = async (id: string) => {
      dispatch(setIsLoading({ isLoading: true }));
      const { data } = await productService.getProductById(id);
      setTotalPrice(data.price.toString());
      dispatch(setSelectedProduct(data));
      dispatch(setIsLoading({ isLoading: false }));
    };

    const getProdutcsByCategories = async (categories: string) => {
      const queryUrl = routeHelper.addQueryToUrl(`${api_url}/product`, {
        categories,
      });

      const { data } = await productService.getProducts(queryUrl);
      dispatch(setProducts(data));
    };
    if (productState.products.length < 1 && productState.selectedProduct.id) {
      const categories = productState.selectedProduct.categories.join(",");
      getProdutcsByCategories(categories);
    }

    if (!productState.selectedProduct.id) {
      const productId = location.pathname.split("product/")[1];
      getProductById(productId);
    }
  }, [dispatch, location.pathname, productState]);

  useEffect(() => {
    if (
      userState.user.role !== Role.Customer &&
      !productState.favorites &&
      !productState.selectedProduct.id
    )
      return;
    const isFav = productState.favorites.find(
      (favorite) => favorite.productId.id === productState.selectedProduct.id
    );
    setIsFavorite(!!isFav);
  }, [productState.favorites, productState.selectedProduct.id, userState]);

  useEffect(() => {
    const isFollowControl = userState.followers.find(
      (followed) =>
        followed.id ===
        (productState.selectedProduct.ownerId
          ? productState.selectedProduct.ownerId.id
          : userState.user.id)
    );
    setIsFollow(!!isFollowControl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.followers]);

  const handlePieceChange = (value: number) => {
    setPiece(value);
    let price = (value * productState.selectedProduct.price).toString();
    const splitted = price.split(".");
    if (splitted[1]) {
      price = splitted[0] + "." + splitted[1].substring(0, 2);
    }
    setTotalPrice(price);
  };

  const handleClick = async () => {
    if (
      productState.selectedProduct.stock < 1 ||
      piece > productState.selectedProduct.stock
    ) {
      dispatch(
        setNotification({
          message: "Siparişiniz Alınamadı",
          description: "Stokta bu kadar ürün mevcut değil",
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
      routeHelper.navigation(navigation, pathEnum.Path.HOME);
      return;
    }
    try {
      const { data } = await productService.createOrder({
        piece,
        productId: productState.selectedProduct.id,
      });
      dispatch(addOrder(data));
      dispatch(
        setUserMinusBalance({
          balance: piece * productState.selectedProduct.price,
        })
      );
      dispatch(
        setSelectedProduct({
          ...productState.selectedProduct,
          stock: productState.selectedProduct.stock - piece,
        })
      );
      dispatch(
        setNotification({
          message: "Siparişiniz Alındı",
          description: "Satıcının onay vermesini bekleyiniz",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "Siparişiniz Alınamadı",
          description: error.response.data.message,
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  const handleFollow = async () => {
    try {
      if (!productState.selectedProduct.ownerId) {
        dispatch(
          setNotification({
            message: "Not Found",
            description: "Satıcıya Ulaşılamıyor",
            placement: "top",
            isNotification: true,
            status: "error",
          })
        );
        return;
      }
      const { data } = await userService.followToSeller({
        followedId: productState.selectedProduct.ownerId.id,
      });
      const follow = convertHelper.convertResponseFollowToReduxFollow(data);
      dispatch(addFollower(follow));
      dispatch(
        setNotification({
          message: "Satıcı, Takip Listenize Eklendi",
          description: "",
          placement: "top",
          isNotification: true,
          status: "info",
        })
      );
    } catch (error) {}
  };
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="m-3 min-h-[87vh] flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-around items-stretch flex-wrap">
        {productState.selectedProduct.images &&
          productState.selectedProduct.images.length > 0 && (
            <div className="w-full flex justify-center items-center md:w-1/2 lg:max-w-[800px] p-4 bg-white rounded-md">
              <img
                src={imageHelper.getBase64(
                  productState.selectedProduct.images[0]
                )}
                alt=""
              />
            </div>
          )}
        <div
          className={`${
            productState.selectedProduct.images &&
            productState.selectedProduct.images.length > 0
              ? "mt-3 md:w-1/2 lg:w-auto md:mt-0"
              : ""
          } w-full flex justify-center items-center `}
        >
          <div className="w-full max-w-[800px] h-auto p-4 bg-white rounded-md">
            <table className="w-full">
              <tbody className="w-full">
                <tr className="border-b w-full h-10">
                  <td
                    className={`pl-3 ${
                      userState.user.role !== roleEnum.Role.Customer
                    } whitespace-nowrap`}
                  >
                    <span className="text-orange font-semibold text-xl ">
                      {productState.selectedProduct.name.toUpperCase()}
                    </span>
                  </td>
                  {userState.user.role === roleEnum.Role.Customer && (
                    <td className="float-right">
                      <button className="text-red-500">
                        <img
                          src={
                            isFavorite
                              ? icons.fill_favorite
                              : icons.empty_favorite
                          }
                          alt="fav"
                        />
                      </button>
                    </td>
                  )}
                </tr>
                <tr className="border-b w-full h-10">
                  <td className="pl-3">
                    <span className="text-thirdy font-semibold text-lg">
                      {productState.selectedProduct.price} ₺
                    </span>
                  </td>
                </tr>
                <tr className="border-b w-full h-10">
                  <td className="pl-3">
                    <span className="text-primary font-semibold ">Adet</span>
                  </td>
                  <td className="w-1/2">
                    <InputNumber
                      disabled={userState.user.role !== roleEnum.Role.Customer}
                      className="!w-full"
                      placeholder="Adet"
                      value={piece}
                      min={1}
                      max={productState.selectedProduct.stock}
                      onChange={handlePieceChange}
                    />
                  </td>
                </tr>

                <tr className="border-b w-full h-10">
                  <td className="pl-3">
                    <span className="text-primary font-semibold ">
                      Sepet Tutarı
                    </span>
                  </td>
                  <td className="text-thirdy font-semibold text-lg">
                    {totalPrice} ₺
                  </td>
                </tr>
                <tr className="border-b w-full h-10">
                  <td className="pl-3">
                    <span className="text-primary font-semibold ">Satıcı</span>
                  </td>
                  <td className="text-secondary font-semibold text-lg">
                    {productState.selectedProduct.ownerId &&
                      productState.selectedProduct.ownerId.firstName.concat(
                        " ",
                        productState.selectedProduct.ownerId.lastName
                      )}
                  </td>
                </tr>
                <tr className="w-full border-b h-10">
                  <td className="pl-3">
                    <span className="text-primary font-semibold ">
                      Kategori
                    </span>
                  </td>
                  <td className="">
                    {productState.selectedProduct.categories.map((id) => {
                      const category = categoryState.initialState.find(
                        (cat) => cat.id === id
                      );
                      return (
                        <span className="p-1 px-2 mr-2 border bg-pink">
                          {category?.name}
                        </span>
                      );
                    })}
                  </td>
                </tr>
                {userState.user.role === roleEnum.Role.Customer && (
                  <tr className="w-full h-10">
                    <td>
                      {isFollow ? (
                        <Tooltip title="Takibi Bırak">
                          <Button onClick={handleFollow} className="mt-3">
                            Satıcı Takip Ediliyor
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button onClick={handleFollow} className="mt-3">
                          Satıcıyı Takip et
                        </Button>
                      )}
                    </td>
                    <td className="float-right mt-3">
                      <Button type="primary" onClick={handleClick}>
                        Sipariş Ver
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {productState.products.length > 0 && (
        <>
          <div className="container px-auto  mt-6">
            <h3 className="text-primary font-bold  underline-offset-1 text-xl">
              BENZER ÜRÜNLER
            </h3>
            <div className="">
              <Slider {...productsSliderSettings}>
                {productState.products
                  .filter(
                    (product) => product.id !== productState.selectedProduct.id
                  )
                  .map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
