import { Button, InputNumber, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertHelper, routeHelper } from "../../helpers";
import {
  useAppDispatch,
  useAppSelector,
  useAppWindowSize,
} from "../../redux/hooks";
import {
  addOrder,
  setProducts,
  setSelectedProduct,
} from "../../redux/productSlice/productSlice";
import { productService, userService } from "../../service";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import ImagesView from "../../components/ImagesView/ImagesView";
import moment from "moment";

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
  const size = useAppWindowSize();

  const ownerFullname = useMemo(() => {
    return (
      productState.selectedProduct.ownerId.firstName +
      " " +
      productState.selectedProduct.ownerId.lastName
    );
  }, [productState.selectedProduct.ownerId]);

  const productStatus = useMemo(() => {
    return {
      isTrend: productState.globalDatas.trends.find(
        (data) => data.id === productState.selectedProduct.id
      )
        ? true
        : false,
      isNew: productState.globalDatas.new.find(
        (data) => data.id === productState.selectedProduct.id
      )
        ? true
        : false,
      isBestSale: productState.globalDatas.bestSales.find(
        (data) => data.id === productState.selectedProduct.id
      )
        ? true
        : false,
    };
  }, [productState.selectedProduct, productState.globalDatas]);

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
    <div className="p-3 w-full min-h-[87vh] flex flex-col justify-start items-center">
      <div className="w-full max-w-[1200px]">
        <div className="w-full flex flex-col justify-start">
          <h2 className="font-bold font-sans text-xl">
            {productState.selectedProduct.name}
          </h2>
          <div className="w-full flex flex-row justify-between items-center">
            <div>Değenlendirmer vs.</div>
            <div>
              {userState.user.role === Role.Customer && (
                <Tooltip
                  title={isFavorite ? "Favoriden Kaldır" : "Favorilerime Ekle"}
                  placement="leftTop"
                >
                  <button className="text-red-500">
                    <img
                      src={
                        isFavorite ? icons.fill_favorite : icons.empty_favorite
                      }
                      alt="fav"
                    />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          {productState.selectedProduct.images &&
            productState.selectedProduct.images.length > 0 && (
              <ImagesView images={productState.selectedProduct.images} />
            )}
        </div>
        <div className="w-full mt-8 flex flex-row justify-between flex-wrap">
          <div className="w-full sm:w-2/3 pr-5">
            <div className="relative">
              <div className="flex flex-row items-center space-x-2">
                <h2 className="font-bold font-sans text-lg text-primary ">
                  {productState.selectedProduct.name}
                </h2>
                <h2>&#x2022;</h2>
                <h2 className="font-bold font-sans text-lg text-primary ">
                  Satıcı:{" "}
                  <span className="text-secondary">{ownerFullname}</span>
                </h2>
              </div>
              <span className="text-thirdy">
                {moment(productState.selectedProduct.createdAt).format(
                  "DD/MM/YYY"
                )}{" "}
                tarihinden itibaren satışta
              </span>
              {size.width < 640 && (
                <Button
                  href="#order"
                  type="link"
                  className="!absolute right-0 bottom-1"
                >
                  Sipariş Ver
                </Button>
              )}
            </div>
            <div className=" border  h-[1px] my-4 " />
            <div className="flex flex-col space-y-5">
              {productStatus.isTrend && (
                <div className="flex flex-row items-center">
                  <img src={icons.trend} alt="" className="mr-4" />
                  <span className="font-semibold text-base font-sans">
                    Çok Tıklananlar Listesinde
                  </span>
                </div>
              )}
              {productStatus.isNew && (
                <div className="flex flex-row items-center">
                  <img src={icons._new} alt="" className="mr-4" />
                  <span className="font-semibold text-base font-sans">
                    En Yeniler Arasında
                  </span>
                </div>
              )}
              {productStatus.isBestSale && (
                <div className="flex flex-row items-center">
                  <img src={icons.best_seller} alt="" className="mr-4" />
                  <span className="font-semibold text-base font-sans">
                    Çok Satılanlardan
                  </span>
                </div>
              )}
            </div>
            {(productStatus.isTrend ||
              productStatus.isNew ||
              productStatus.isBestSale) && (
              <div className=" border h-[1px] my-4 " />
            )}
            {/* ait oldugu kategoriler */}
            <div>
              <h4 className="font-semibold text-base font-sans">
                Ürünün Kategorileri
              </h4>
              <div className="w-full flex flex-row flex-wrap mt-3">
                {productState.selectedProduct.categories.map((id) => {
                  const category = categoryState.initialState.find(
                    (cat) => cat.id === id
                  );
                  return (
                    <div className="p-1 px-4 mr-2 border border-slate-200 shadow-sm rounded-sm bg-pink">
                      {category?.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" border  h-[1px] my-4 " />
            {/* ürün description */}
            <div>
              <h4 className="font-semibold text-base font-sans">
                Ürün Hakkında
              </h4>
              <span>{productState.selectedProduct.description}</span>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure et
                omnis, id ducimus quam, odio sint, ullam tenetur quasi libero
                officiis blanditiis aperiam quae. Provident sapiente explicabo
                totam eligendi recusandae. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aspernatur, necessitatibus magnam
                odit adipisci inventore laboriosam quae, enim qui ad unde
                repellat aut iusto. Quo blanditiis cupiditate incidunt dicta
                laborum nihil? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nesciunt doloribus explicabo at recusandae
                maxime tenetur molestiae, sit autem quae dolores optio, quam
                maiores officia omnis eos enim magni assumenda ullam. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Esse deleniti
                tenetur aspernatur eaque beatae repellendus itaque nam amet
                error minus qui provident animi corporis, earum molestias
                perferendis sequi ipsum ea. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quo illo totam est quia nesciunt
                tempore, inventore architecto possimus nulla pariatur animi
                distinctio accusamus nostrum aliquid iure repellendus, beatae
                dolore modi. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Hic suscipit cumque aliquid? Explicabo a libero vitae et
                tempora esse totam possimus ipsum, architecto, consectetur
                aliquam, laboriosam nisi quidem labore fugit! Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Cum voluptatem iure
                pariatur sint, quidem placeat sed exercitationem molestias
                harum, vel voluptate, id a delectus ducimus rem aut animi
                maiores doloremque. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Enim illo quasi, laudantium, sunt cum eaque
                nostrum commodi cupiditate nemo ducimus aperiam tempore,
                quibusdam sit. Illo blanditiis cupiditate laborum aspernatur
                minima! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident maxime voluptatem atque, quam maiores commodi adipisci
                dolore ipsum corrupti, quo doloribus cumque, corporis qui.
                Molestias voluptas incidunt ex tenetur earum? Lorem, ipsum dolor
                sit amet consectetur adipisicing elit. Magni odit soluta facere
                in commodi pariatur voluptates, optio quasi neque tenetur beatae
                doloremque fugiat quod sint animi ab incidunt cum sequi. Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem,
                provident consequuntur. Dicta veritatis quidem placeat.
                Accusantium, perspiciatis sint quos tempore, a eos ab doloremque
                itaque quis sapiente necessitatibus tenetur nemo. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Et labore eligendi
                ipsam maxime mollitia iure numquam minima, ab necessitatibus
                earum aspernatur ex exercitationem similique tenetur animi atque
                voluptas reprehenderit veritatis.
              </span>
            </div>
          </div>
          <div id="order" className="w-full sm:w-1/3 ">
            <div className="w-full sticky top-3 p-4 border rounded-md shadow-md bg-white ">
              <div className="flex flex-row items-center">
                <h4 className="text-lg font-sans font-bold text-primary mb-0 pr-1">
                  {productState.selectedProduct.price} ₺
                </h4>
                <span className="text-secondary font-semibold ">adet</span>
              </div>
              <div className="flex flex-row items-center justify-start h-8">
                <div className="flex flex-row items-center">
                  <img className="mr-1" src={icons.star} alt="star" />
                  <span className="font-bold text-lg">
                    {productState.selectedProduct.ratingPoint}
                  </span>
                </div>
                <h2 className="mx-3">&#x2022;</h2>
                <span className="text-secondary font-semibold pb-1">
                  {productState.selectedProduct.ratingCount} değenlendirme
                </span>
              </div>
              <InputNumber
                disabled={userState.user.role !== roleEnum.Role.Customer}
                className="!w-full !mt-2"
                placeholder="Adet"
                value={piece}
                min={1}
                max={productState.selectedProduct.stock}
                onChange={handlePieceChange}
              />
              <Button
                className="w-full mt-3 mb-2 !border-none !bg-green-600"
                type="primary"
                onClick={handleClick}
                disabled={userState.user.role !== Role.Customer}
              >
                Sipariş Ver
              </Button>
              <span className="text-thirdy text-[.75rem]">
                Satıcı onaylamadan ücret ödenmez.
              </span>
              <div className=" border  h-[1px] my-4 " />
              <span className="text-lg font-semibold">Tutar : </span>
              <span className="text-lg font-sans font-semibold">
                {totalPrice} ₺
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 bg-red-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          quia dolorum ea odit eligendi, esse libero, quisquam odio iusto aut
          assumenda incidunt iure voluptatum perferendis minus voluptates. Ab at
          voluptatibus nihil ex, suscipit omnis dolorum corrupti atque rem
          nesciunt odio possimus praesentium facilis voluptatem doloribus odit
          quod cumque quibusdam consequatur? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Totam, tempore. Sapiente qui dicta unde
          est ipsam minima eveniet quis. Sit modi commodi sequi nihil beatae
          placeat ut quibusdam quisquam vero rem eveniet repudiandae atque
          doloribus sapiente perspiciatis, iusto ex et nobis magni dolore
          officia maxime eum exercitationem similique! Odit, dicta! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Totam, tempore. Sapiente
          qui dicta unde est ipsam minima eveniet quis. Sit modi commodi sequi
          nihil beatae placeat ut quibusdam quisquam vero rem eveniet
          repudiandae atque doloribus sapiente perspiciatis, iusto ex et nobis
          magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          tempore. Sapiente qui dicta unde est ipsam minima eveniet quis. Sit
          modi commodi sequi nihil beatae placeat ut quibusdam quisquam vero rem
          eveniet repudiandae atque doloribus sapiente perspiciatis, iusto ex et
          nobis magni dolore officia maxime eum exercitationem similique! Odit,
          dicta!
        </div>
      </div>
    </div>
  );
};

export default Product;
