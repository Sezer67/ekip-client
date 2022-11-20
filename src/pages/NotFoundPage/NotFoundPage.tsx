import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants";
import { Path } from "../../enums/path.enum";
import { routeHelper } from "../../helpers";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleHomePage = () => {
    routeHelper.navigation(navigate,Path.HOME);
  }
  return (
    <div className="relative flex flex-col justify-center items-center">
      <h1 className="text-2xl">Sayfa Bulunamadı</h1>
      <img src={images.not_found} alt="not found" />
      <Button onClick={handleHomePage} className="mt-6 !bg-primary !text-light !shadow-md">Anasayfaya Dön</Button>
    </div>
  );
};

export default NotFoundPage;
