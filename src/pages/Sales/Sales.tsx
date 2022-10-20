import React, { useEffect, useState } from "react";
import SalesLineChart from "../../components/SalesLineChart/SalesLineChart";
import SalesYearlyChart from "../../components/SalesYearlyChart/SalesYearlyChart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSalesData } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";
import { SalesYearlyType } from "../../types/product-service.type";

const Sales = () => {
  const [salesYearlyData, setSalesYearlyData] = useState<SalesYearlyType[]>([]);
  const productState = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSales = async () => {
      const { data } = await productService.getSales();
      dispatch(setSalesData(data));
    };
    const getSalesYearly = async () => {
      const { data } = await productService.getSalesYearly();
      setSalesYearlyData(data);
    };
    getSales();
    getSalesYearly();
  }, [dispatch]);

  return (
    <div>
      <div className="container px-auto  flex flex-row flex-wrap justify-between items-center">
        <SalesLineChart />
        <div>
          Bu ayki total hasılat: {productState.salesData.filterTotalTaking} ₺
        </div>
        <div>Bu ayki total satış: {productState.salesData.count} ₺</div>
      </div>
      <div className="container px-auto flex flex-row justify-center lg:justify-start">
        <SalesYearlyChart chartDatas={salesYearlyData} />
      </div>
    </div>
  );
};

export default Sales;
