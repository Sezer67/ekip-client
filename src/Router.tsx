import { notification, Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { setApiToken } from "./axios.util";
import Layout from "./components/Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Role } from "./enums/role.enum";
import { convertHelper, storageHelper } from "./helpers";
import { setCategory } from "./redux/categorySlice/categorySlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  setEvaluateProducts,
  setFollowers,
  setUser,
} from "./redux/userSlice/userSlice";
import { categoryService, productService, userService } from "./service";
import { getLoggedUser } from "./service/user.sevice";
import notfound from "./assets/images/notfound.svg";
import { Path } from "./enums/path.enum";
import { setFavorites } from "./redux/productSlice/productSlice";
import { FollowType } from "./redux/types/user.types";
import {
  setIsLoading,
  setNotification,
} from "./redux/userSlice/notificationSlice";
import { gifs } from "./constants";

const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(
  () => import("./pages/RegisterPage/RegisterPage")
);
const DashboardPage = React.lazy(
  () => import("./pages/DashboardPage/DashboardPage")
);

const ProfilePage = React.lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AddProduct = React.lazy(() => import("./pages/AddProduct/AddProduct"));
const EditProduct = React.lazy(() => import("./pages/EditProduct/EditProduct"));
const MyProducts = React.lazy(() => import("./pages/MyProducts/MyProducts"));
const Product = React.lazy(() => import("./pages/Product/Product"));
const MyOrders = React.lazy(() => import("./pages/MyOrders/MyOrders"));
const MyCustomerOrders = React.lazy(
  () => import("./pages/MyCustomerOrders/MyCustomerOrders")
);
const Balance = React.lazy(() => import("./pages/Balance/Balance"));
const Sales = React.lazy(() => import("./pages/Sales/Sales"));
const Favorite = React.lazy(() => import("./pages/Favorite/Favorite"));
const Follow = React.lazy(() => import("./pages/Follow/Follow"));
const Idea = React.lazy(() => import("./pages/Idea/Idea"));
const User = React.lazy(() => import("./pages/Users/User"));
const UsersIdea = React.lazy(() => import("./pages/Idea/UsersIdea"));
const IdeaEdit = React.lazy(() => import("./pages/IdeaEdit/IdeaEdit"));
const AllSales = React.lazy(() => import("./pages/Sales/AllSales"));

function App() {
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  const userState = useAppSelector((state) => state.user);
  const categoryState = useAppSelector((state) => state.category);
  const productState = useAppSelector((state) => state.product);
  const notificationState = useAppSelector((state) => state.notification);

  // kategoriler - favoriler - takipçiler asdece bir page de değil her page de olacağı için global olarak istek atılıyor
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await categoryService.getCategories();
        dispatch(setCategory(data));
      } catch (error) {
        console.log(error);
      }
    };
    const getFavorites = async () => {
      try {
        const { data } = await productService.getFavorites();
        dispatch(setFavorites(data));
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    const getUser = async () => {
      try {
        const token = storageHelper.getValueByKey("token");
        if (!token) {
          setIsAuth(false);
          return;
        }
        setApiToken(token);
        const user = await getLoggedUser();
        user.data.token = token;
        dispatch(setUser(user.data));
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    const getFollowers = async () => {
      // customer için takip ettikleri - seller için takipçileri followers a aktarılacak

      try {
        const followers: FollowType[] = [];
        if (userState.user.role === Role.Customer) {
          const { data } = await userService.getMyFollowedSeller();

          data.forEach((value) => {
            followers.push(value.followedId);
          });
        } else if (userState.user.role === Role.Seller) {
          const { data } = await userService.getMyFollowers();

          data.forEach((value) => {
            followers.push(value.followerId);
          });
        }
        dispatch(setFollowers(followers));
      } catch (error) {}
    };

    const getEvaluateProducts = async () => {
      try {
        const { data } = await productService.getEvaluatedProductsByUser();
        const converted = convertHelper.convertEvaluateProductToReduxType(data);
        dispatch(setEvaluateProducts(converted));
      } catch (error) {
        console.log(error);
      }
    };

    if (userState.user.token) {
      setIsAuth(true);
    } else getUser();
    if (categoryState.initialState.length < 1) {
      getCategories();
    }
    if (
      userState.user.role === Role.Customer &&
      productState.favorites &&
      productState.favorites.length < 1
    ) {
      getFavorites();
    }
    if (
      userState.user.role === Role.Customer &&
      userState.evaluateProducts &&
      userState.evaluateProducts.length < 1
    ) {
      getEvaluateProducts();
    }
    if (userState.user.role !== Role.Admin && userState.followers.length < 1) {
      getFollowers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryState.initialState.length, dispatch, userState.user]);

  const openNotification = () => {
    notification[notificationState.status]({
      message: notificationState.message,
      description: notificationState.description,
      placement: notificationState.placement,
    });
    dispatch(
      setNotification({
        description: "",
        message: "",
        status: "success",
        isNotification: false,
        placement: "top",
      })
    );
  };

  useEffect(() => {
    if (notificationState.isNotification) openNotification();
  }, [notificationState.isNotification]);

  if (isAuth === undefined) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );
  }

  return (
    <div id="app" className="bg-light">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <img alt="" src={gifs.ripple} />
          </div>
        }
      >
        <Routes>
          <Route
            path={Path.HOME}
            element={
              <Layout>
                <ProtectedRoute isAuth={isAuth} />
              </Layout>
            }
          >
            <Route
              path={Path.HOME}
              element={
                userState.user.role === Role.Admin ? (
                  <User />
                ) : (
                  <DashboardPage />
                )
              }
            />
            <Route path={Path.PROFILE} element={<ProfilePage />} />

            {userState.user.role === Role.Seller && (
              <>
                <Route path={Path.NEW_PRODUCT} element={<AddProduct />} />
                <Route path={Path.MY_PRODUCT} element={<MyProducts />} />
                <Route
                  path={`${Path.PRODUCT_EDIT_QUERY_ID}/:id`}
                  element={<EditProduct />}
                />
                <Route
                  path={Path.SELLER_ORDER}
                  element={<MyCustomerOrders />}
                />
                <Route path={Path.SALES} element={<Sales />} />
              </>
            )}
            {userState.user.role === Role.Customer && (
              <>
                <Route path={Path.CUSTOMER_ORDER}>
                  <Route index element={<MyOrders />} />
                </Route>
                <Route path={Path.FAVORITE} element={<Favorite />} />
              </>
            )}
            {userState.user.role === Role.Admin && (
              <>
                <Route path={Path.USERS} element={<User />} />
                <Route path={Path.USERIDEA}>
                  <Route index element={<UsersIdea />} />
                  <Route path=":id" element={<IdeaEdit />} />
                </Route>
                <Route path={Path.SALES} element={<AllSales />} />
              </>
            )}
            <Route path={Path.PRODUCT}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path={Path.FOLLOW} element={<Follow />} />
            <Route path={Path.BALANCE} element={<Balance />} />
            <Route path={Path.IDEA} element={<Idea />} />
          </Route>
          <Route path={Path.LOGIN} element={<LoginPage />} />
          <Route path={Path.REGISTER} element={<RegisterPage />} />
          <Route
            path={Path.NOT_FOUND}
            element={
              <div>
                <img src={notfound} alt="not found" />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
