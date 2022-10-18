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
import { setUser } from "./redux/userSlice/userSlice";
import { categoryService } from "./service";
import { getLoggedUser } from "./service/user.sevice";
import notfound from "./assets/images/notfound.svg";
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

function App() {
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
  const userState = useAppSelector((state) => state.user);
  const categoryState = useAppSelector((state) => state.category);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await categoryService.getCategories();
        dispatch(setCategory(data));
      } catch (error) {
        console.log(error);
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
    if (userState.user.token) {
      setIsAuth(true);
    } else getUser();
    if (categoryState.initialState.length < 1) {
      getCategories();
    }
  }, [userState.user]);

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
            path="/"
            element={
              <Layout>
                <ProtectedRoute isAuth={isAuth} />
              </Layout>
            }
          >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {userState.user.role === Role.Seller && (
              <>
                <Route path="/new-product" element={<AddProduct />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route
                  path="/my-customer-orders"
                  element={<MyCustomerOrders />}
                />
              </>
            )}

            <Route path="/product">
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="/my-orders">
              <Route index element={<MyOrders />} />
              <Route path=":id" element={<Product />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
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
