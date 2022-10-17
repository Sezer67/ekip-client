import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { icons } from "../../constants";
import { imageHelper } from "../../helpers";
import { useAppSelector } from "../../redux/hooks";

const EditProduct = () => {
  const [page, setPage] = useState<number>(0);

  const productState = useAppSelector((state) => state.product);

  return (
    <div className="m-3 flex-col">
      <div className="flex flex-row flex-wrap justify-between">
        <div className="w-full md:max-w-[500px]">
          <ProductForm isEdit />
        </div>
        <div className="relative w-full h-auto lg:w-[calc(100%-800px)] flex flex-col lg:justify-center items-center">
          {productState.selectedProduct.images &&
            productState.selectedProduct.images
              .slice(1 * page, page * 1 + 1)
              .map((image) => (
                <div className="max-w-[40rem] max-h-96">
                  <img
                    src={imageHelper.getBase64(image)}
                    alt=""
                    className="object-cover"
                  />
                </div>
              ))}
          {productState.selectedProduct.images && (
            <div className="absolute w-full flex flex-row h-24 sm:h-40 items-center justify-between px-3">
              <img
                onClick={() => {
                  if (page !== 0) setPage(page - 1);
                }}
                src={icons.left_arrow}
                alt="l-arrow"
                className="blur-sm cursor-pointer hover:blur-0 transition-all duration-300"
              />
              <img
                onClick={() => {
                  if (productState.selectedProduct.images?.length !== page + 1)
                    setPage(page + 1);
                }}
                src={icons.right_arrow}
                alt="r-arrow"
                className="blur-sm cursor-pointer hover:blur-0 transition-all duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
