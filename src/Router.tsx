import { Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setUser } from "./redux/userSlice/userSlice";
import { getLoggedUser } from "./service/user.sevice";

const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(
  () => import("./pages/RegisterPage/RegisterPage")
);
const DashboardPage = React.lazy(
  () => import("./pages/DashboardPage/DashboardPage")
);

function App() {
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      try {
        const user = await getLoggedUser();
        console.log("Giriş yapılı kullanıcı : ", user);
        dispatch(setUser(user.data));
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    if (userState.user.token) {
      console.log("if e girdi");
      setIsAuth(true);
    } else getUser();
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Routes>
          <Route
            element={
              <Layout>
                <ProtectedRoute isAuth={isAuth} />
              </Layout>
            }
          >
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
