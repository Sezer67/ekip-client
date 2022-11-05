import { Button, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesLineChart from "../../components/SalesLineChart/SalesLineChart";
import SalesYearlyChart from "../../components/SalesYearlyChart/SalesYearlyChart";
import { api_url } from "../../configs/url.config";
import { icons } from "../../constants";
import { pathEnum } from "../../enums";
import { convertHelper, imageHelper, routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setSalesData,
  setSelectedProduct,
} from "../../redux/productSlice/productSlice";
import { BestSalesType } from "../../redux/types/product.type";
import { productService } from "../../service";
import { SalesYearlyType } from "../../types/product-service.type";

const Sales = () => {
  const [salesYearlyData, setSalesYearlyData] = useState<SalesYearlyType[]>([]);
  const [salesYearlyTaking, setSalesYearlyTaking] = useState<number>(0);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [bestSaledProduct, setBestSaledProduct] = useState<BestSalesType>();
  const productState = useAppSelector((state) => state.product);
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getSales = async (date: string) => {
      const requestUrl = routeHelper.addQueryToUrl(
        `${api_url}/order/@me/sales`,
        {
          date,
        }
      );
      const { data } = await productService.getSales(requestUrl);
      dispatch(setSalesData(data));
    };
    getSales(activeDate.toString());
  }, [activeDate, dispatch]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await productService.getBestSaledProduct();
        const convertedArray = convertHelper.convertBestSalesResponseToProducts(
          [data]
        );
        setBestSaledProduct(convertedArray[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const getSalesYearly = async () => {
      const { data } = await productService.getSalesYearly();
      setSalesYearlyData(data);
      let takings = 0;
      data.forEach((val) => {
        takings += val.taking;
      });
      setSalesYearlyTaking(takings);
    };
    getSalesYearly();
    getProduct();
  }, []);

  const handleRouteEditPage = () => {
    if (!bestSaledProduct) return;
    dispatch(setSelectedProduct(bestSaledProduct));
    routeHelper.navigation(
      navigate,
      `${pathEnum.Path.PRODUCT_EDIT_QUERY_ID}/${bestSaledProduct.id}`
    );
  };

  return (
    <div>
      <div className="w-full px-5 flex flex-row flex-wrap justify-between items-center">
        {productState.salesData.sales.length < 1 ? (
          <div className="w-full flex justify-center items-center">
            <Empty
              description="Bu ay satışınız olmamış"
              style={{ fontSize: "16px", fontWeight: "700" }}
            />
          </div>
        ) : (
          <SalesLineChart month={activeDate.getMonth()} />
        )}
        <div className="flex flex-col items-start mb-5 ml-5 lg:ml-0">
          <button
            onClick={() =>
              setActiveDate(
                new Date(activeDate.getFullYear(), activeDate.getMonth() - 1)
              )
            }
            className="flex flex-row items-center mb-4"
          >
            <img src={icons.left_arrow} alt="icon" className="w-5 h-5 mr-3" />
            <span>Önceki Ay</span>
          </button>
          <div className="relative  overflow-hidden w-[300px] h-[100px] bg-white rounded-md shadow-md flex flex-row justify-around items-center">
            <div className="absolute z-0  w-[170px] bg-[#F1CBD7] h-[150px] -left-10 rounded-full " />
            <span className="text-primary z-10 font-bold  text-base">
              {productState.salesData.filterTotalTaking} ₺
            </span>
            <span className="text-primary font-bold text-base">
              Bu Aylık Hasılat
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end  lg:ml-0">
          <button
            onClick={() =>
              setActiveDate(
                new Date(activeDate.getFullYear(), activeDate.getMonth() + 1)
              )
            }
            className="flex flex-row items-center mb-4"
          >
            <span>Sonraki Ay</span>
            <img src={icons.right_arrow} alt="icon" className="w-5 h-5 ml-3" />
          </button>
          <div className="relative mb-5 ml-5 overflow-hidden w-[300px] h-[100px] bg-white rounded-md shadow-md flex flex-row justify-around items-center">
            <div className="absolute z-0 w-[150px] bg-[#CEE1F1] h-[150px] -left-10 rounded-full " />
            <span className="text-primary z-10 font-bold  text-base">
              {productState.salesData.count}{" "}
            </span>
            <span className="text-primary font-bold text-base">
              Bu Aylık Satış
            </span>
          </div>
        </div>
      </div>
      <div className="w-full px-5 flex flex-row flex-wrap justify-around items-center">
        <div className="w-[750px]">
          <SalesYearlyChart chartDatas={salesYearlyData} />
        </div>
        <div className="relative mt-5 ml-5 lg:ml-0 overflow-hidden w-[300px] h-[100px] bg-white rounded-md shadow-md flex flex-row justify-around items-center">
          <div className="absolute z-0  w-[170px] bg-[#F1CBD7] h-[150px] -left-10 rounded-full " />
          <span className="text-primary z-10 font-bold  text-base">
            {salesYearlyTaking} ₺
          </span>
          <span className="text-primary font-bold text-base">
            Bu Yıllık Hasılat
          </span>
        </div>
        <div className="relative mt-5 ml-5 overflow-hidden w-[300px] h-[100px] bg-white rounded-md shadow-md flex flex-row justify-around items-center">
          <div className="absolute z-0 w-[180px] bg-[#CEE1F1] h-[150px] -left-10 rounded-full " />
          <span className="text-primary z-10 font-bold  text-base">
            {userState.user.balance} ₺
          </span>
          <span className="text-primary font-bold text-base">Bakiyem</span>
        </div>
      </div>
      {bestSaledProduct && (
        <div className="w-full mt-5 px-5 ">
          <h3 className="text-primary font-semibold text-base">
            En çok Satılan Ürünüm
          </h3>
          <div className=" w-full flex flex-row items-center flex-wrap">
            {bestSaledProduct.images && bestSaledProduct.images.length > 0 ? (
              <img
                src={imageHelper.getBase64(bestSaledProduct.images[0])}
                alt=""
                className="max-h-[100px]"
              />
            ) : (
              <Button onClick={handleRouteEditPage} type="link">
                Bu ürüne resim eklemek için tıkla.
              </Button>
            )}
            <div className=" flex flex-row flex-wrap mt-3 sm:mt-0">
              <div className="flex flex-col ml-5 items-center mb-3">
                <span className="whitespace-nowrap border-b border-primary w-[135px] text-center">
                  Ürün Adı
                </span>
                <span className="font-semibold text-primary">
                  {bestSaledProduct.name}
                </span>
              </div>
              <div className="flex flex-col ml-5 items-center mb-3">
                <span className="whitespace-nowrap border-b border-primary w-[135px] text-center">
                  Ürün Fiyatı
                </span>
                <span className="font-semibold text-primary">
                  {bestSaledProduct.price} ₺
                </span>
              </div>
              <div className="flex flex-col ml-5 items-center mb-3">
                <span className="whitespace-nowrap border-b border-primary w-[135px] text-center">
                  Görüntülenme Sayısı
                </span>
                <span className="font-semibold text-primary">
                  {bestSaledProduct.showCount}
                </span>
              </div>
              <div className="flex flex-col ml-5 items-center mb-3">
                <span className="whitespace-nowrap border-b border-primary w-[135px] text-center">
                  Ürün Stoğu
                </span>
                <span className="font-semibold text-primary">
                  {bestSaledProduct.stock}
                </span>
              </div>
              <div className="flex flex-col ml-5 items-center mb-3">
                <span className="whitespace-nowrap border-b border-primary w-[135px] text-center">
                  Satılan Adet
                </span>
                <span className="font-semibold text-primary">
                  {bestSaledProduct.sum}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
