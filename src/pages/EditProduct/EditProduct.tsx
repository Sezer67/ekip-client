import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import ProductForm from "../../components/ProductForm/ProductForm";
import { icons } from "../../constants";
import { imageHelper } from "../../helpers";
import { useAppSelector } from "../../redux/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EditProduct = () => {
  const productState = useAppSelector((state) => state.product);
  const settings: Settings = {
    accessibility: false,
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };
  return (
    <div className="p-3 flex-col">
      <div className="flex flex-row flex-wrap justify-between">
        <div className="w-full md:max-w-[500px]">
          <ProductForm isEdit />
        </div>
        <div className="container px-auto my-auto h-auto lg:w-[calc(100%-800px)] ">
          {productState.selectedProduct.images && (
            <Slider {...settings}>
              {productState.selectedProduct.images.map((uri) => (
                <div>
                  <img alt="" src={imageHelper.getBase64(uri)} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
