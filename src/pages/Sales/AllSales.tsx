/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Table } from "antd";
import locale from "antd/lib/date-picker/locale/tr_TR";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import "moment/";
import React, { useEffect, useState } from "react";
import { gifs } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OrderStateType } from "../../redux/types/product.type";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";

type UserDataType = {
  id: string;
  username: string;
};
type FilterStatusType = {
  text: string;
  value: string;
};

const AllSales = () => {
  const [allSales, setAllSales] = useState<OrderStateType[]>([]);
  const [filterDatas, setFilterDatas] = useState<{
    sellerNames: FilterStatusType[];
    customerNames: FilterStatusType[];
  }>({ sellerNames: [], customerNames: [] });
  const [datePick, setDatePick] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
  });

  const loading = useAppSelector((state) => state.notification.isLoading);
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      dispatch(setIsLoading({ isLoading: true }));
      const { data } = await productService.getAllSalesByDate(datePick);
      setAllSales(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading({ isLoading: false }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // set filter datas
  useEffect(() => {
    let sellerNames: FilterStatusType[] = [];
    let customerNames: FilterStatusType[] = [];
    allSales.forEach((sale) => {
      const sellerCtrl = sellerNames.find(
        (name) => name.text === (sale.ownerId as any).username
      );
      const customerCtrl = customerNames.find(
        (name) => name.text === (sale.customerId as any).username
      );
      if (!sellerCtrl) {
        sellerNames.push({
          text: (sale.ownerId as any).username,
          value: (sale.ownerId as any).username,
        });
      }
      if (!customerCtrl) {
        customerNames.push({
          text: (sale.customerId as any).username,
          value: (sale.customerId as any).username,
        });
      }
    });
    setFilterDatas({ customerNames, sellerNames });
  }, [allSales]);

  const onChangeDate = (values: any) => {
    setDatePick({
      startDate: new Date(values[0]._d as string),
      endDate: new Date(values[1]._d as string),
    });
  };

  const disabledDate = (currentDate: any) => {
    return currentDate && currentDate > moment().endOf("day");
  };
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  const columns: ColumnsType<OrderStateType> = [
    {
      title: "Satıcı",
      dataIndex: "ownerId",
      key: "ownerId",
      filters: filterDatas.sellerNames,
      onFilter: (value, record) => (record.ownerId as any).username === value,
      render: (value: UserDataType) => <span>{value.username}</span>,
    },
    {
      title: "Müşteri",
      dataIndex: "customerId",
      key: "customerId",
      filters: filterDatas.customerNames,
      onFilter: (value, record) =>
        (record.customerId as any).username === value,
      render: (value: UserDataType) => <span>{value.username}</span>,
    },
    {
      title: "Ürün Adı",
      dataIndex: "productId",
      key: "productId",
      render: (value) => <span>{value.name}</span>,
    },
    {
      title: "Gelir",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (value) => <span>{value} ₺</span>,
    },
    {
      title: "Tarih",
      dataIndex: "answerAt",
      key: "answerAt",
      render: (value: Date) => (
        <span>{moment(value).format("DD/MM/YYYY HH:mm")} </span>
      ),
    },
  ];

  return (
    <div className="p-3">
      <div className="w-full">
        <div className="flex flex-row flex-wrap items-start">
          <DatePicker.RangePicker
            locale={locale}
            onChange={onChangeDate}
            defaultValue={[
              moment(datePick.startDate, "YYYY-MM-DD"),
              moment(datePick.endDate, "YYYY-MM-DD"),
            ]}
            disabledDate={disabledDate}
            className="mb-4"
          />
          <Button
            onClick={getData}
            className="mb-4 mt-4 sm:mt-0 sm:ml-4"
            type="primary"
          >
            Görüntüle
          </Button>
          <div className="mt-5 sm:mt-1 ml-4">
            <span className="font-semibold text-base">
              Toplam {allSales.length} sonuç
            </span>
          </div>
        </div>
        <Table
          locale={{
            triggerAsc: "Artan Sıralama",
            triggerDesc: "Azalan Sıralama",
            cancelSort: "Sıralamayı İptal Et",
            filterReset: false,
            filterConfirm: "Uygula",
          }}
          dataSource={allSales}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default AllSales;
