import { Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { setApiToken } from "./axios.util";
import Layout from "./components/Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Role } from "./enums/role.enum";
import { storageHelper } from "./helpers";
import { setCategory } from "./redux/categorySlice/categorySlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setFollowers, setUser } from "./redux/userSlice/userSlice";
import { categoryService, productService, userService } from "./service";
import { getLoggedUser } from "./service/user.sevice";
import notfound from "./assets/images/notfound.svg";
import { Path } from "./enums/path.enum";
import { setFavorites } from "./redux/productSlice/productSlice";
import { FollowType } from "./redux/types/user.types";
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

function App() {
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
  const userState = useAppSelector((state) => state.user);
  const categoryState = useAppSelector((state) => state.category);
  const productState = useAppSelector((state) => state.product);

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
      } catch (error) {}
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

    if (userState.user.token) {
      setIsAuth(true);
    } else getUser();
    if (categoryState.initialState.length < 1) {
      getCategories();
    }
    if (
      userState.user.role === Role.Customer &&
      productState.favorites.length < 1
    ) {
      getFavorites();
    }
    if (userState.followers.length < 1) {
      getFollowers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryState.initialState.length, dispatch, userState.user]);

  if (isAuth === undefined) {
    return (
      <div id="app" className="bg-light">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div id="app" className="bg-light">
      <Suspense fallback={<Spin size="large" />}>
        <Routes>
          <Route
            path={Path.HOME}
            element={
              <Layout>
                <ProtectedRoute isAuth={isAuth} />
              </Layout>
            }
          >
            <Route path={Path.HOME} element={<DashboardPage />} />
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
            <Route path={Path.PRODUCT}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path={Path.FOLLOW} element={<Follow />} />
            <Route path={Path.BALANCE} element={<Balance />} />
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
