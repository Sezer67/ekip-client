import React, { useEffect, useState } from "react";
import SalesLineChart from "../../components/SalesLineChart/SalesLineChart";
import SalesYearlyChart from "../../components/SalesYearlyChart/SalesYearlyChart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSalesData } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";
import { SalesYearlyType } from "../../types/product-service.type";

const Sales = () => {
  const [salesYearlyData, setSalesYearlyData] = useState<SalesYearlyType[]>([]);
  const [salesYearlyTaking, setSalesYearlyTaking] = useState<number>(0);

  const productState = useAppSelector((state) => state.product);
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSales = async () => {
      const { data } = await productService.getSales();
      dispatch(setSalesData(data));
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
    getSales();
    getSalesYearly();
  }, [dispatch]);

  return (
    <div>
      <div className="w-full px-5 flex flex-row flex-wrap justify-between items-center">
        <SalesLineChart />
        <div className="relative mb-5 ml-5 lg:ml-0 overflow-hidden w-[300px] h-[100px] bg-white rounded-md shadow-md flex flex-row justify-around items-center">
          <div className="absolute z-0  w-[170px] bg-[#F1CBD7] h-[150px] -left-10 rounded-full " />
          <span className="text-primary z-10 font-bold  text-base">
            {productState.salesData.filterTotalTaking} ₺
          </span>
          <span className="text-primary font-bold text-base">
            Bu Aylık Hasılat
          </span>
        </div>
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
    </div>
  );
};

export default Sales;
