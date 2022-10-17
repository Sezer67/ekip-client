import { Button, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { imageHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedProduct } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";

const Product = () => {
  const productState = useAppSelector((state) => state.product);
  const categoryState = useAppSelector((state) => state.category);
  const [piece, setPiece] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<string>(
    (1 * productState.selectedProduct.price).toString()
  );

  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProductById = async (id: string) => {
      const { data } = await productService.getProductById(id);
      setTotalPrice(data.price.toString());
      dispatch(setSelectedProduct(data));
    };

    if (!productState.selectedProduct.id) {
      const productId = location.pathname.split("product/")[1];
      getProductById(productId);
    }
  }, [productState]);

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
    // sipariş verme fonk.
  };

  return (
    <div className="m-3 min-h-[87vh] flex justify-center items-center">
      <div className="flex flex-row justify-start items-stretch flex-wrap">
        {productState.selectedProduct.images &&
          productState.selectedProduct.images.length > 0 && (
            <div className="w-full md:w-1/2 lg:w-[600px] p-4 bg-white rounded-md">
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
              ? "mt-3 md:w-1/2 lg:w-auto md:pl-4 md:mt-0"
              : ""
          } w-full  `}
        >
          <div className="w-full p-4 bg-white rounded-md">
            <table className="w-full">
              <tbody className="w-full">
                <tr className="border-b w-full h-10">
                  <td className="pl-3">
                    <span className="text-orange font-semibold text-xl">
                      {productState.selectedProduct.name.toUpperCase()}
                    </span>
                  </td>
                  <td className="">
                    <button className="text-red-500">Favorilere Ekle</button>
                  </td>
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
                    {productState.selectedProduct.ownerId.firstName.concat(
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
                <tr className="w-full h-10">
                  <td />
                  <td className="float-right mt-3">
                    <Button type="primary" onClick={handleClick}>
                      Sipariş Ver
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
