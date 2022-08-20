import { Spin } from "antd";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(
  () => import("./pages/RegisterPage/RegisterPage")
);

function App() {
  return (
    <div id="app" className="bg-light">
      <Suspense fallback={<Spin size="large" />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
