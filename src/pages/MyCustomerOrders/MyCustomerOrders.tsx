import { Button, Empty, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/productSlice/productSlice";
import { OrderStateType } from "../../redux/types/product.type";
import { productService } from "../../service";
import { OrderTableDataTypes } from "./my-customer-order.config";

const MyCustomerOrders = () => {
  const [tableDatas, setTableDatas] = useState<OrderTableDataTypes[]>([]);
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await productService.getMyPendingOrders();
      dispatch(setOrders(data));
    };
    getOrders();
  }, [dispatch]);

  useEffect(() => {
    if (productState.orders.length > 0) {
      const data: OrderTableDataTypes[] = [];
      productState.orders.forEach((order) => {
        data.push({
          actions: "",
          customer: order.customerId.firstName.concat(
            " ",
            order.customerId.lastName
          ),
          date: order.createdAt.toString(),
          name: order.productId.name,
          piece: order.piece,
          takings: order.piece * order.productId.price,
          status: order.isAnswer
            ? order.isAccept
              ? "ONAYLANDI"
              : "REDDEDİLDİ"
            : "ONAY BEKLENİYOR",
        });
      });
      setTableDatas(data);
    }
  }, [productState.orders]);

  const columns: ColumnsType<OrderTableDataTypes> = [
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
      render: (value: string) => (
        <span className="text-primary text-base font-semibold">{value}</span>
      ),
    },
    {
      title: "Adet",
      dataIndex: "piece",
      key: "piece",
    },
    {
      title: "Hasılat",
      dataIndex: "takings",
      key: "takings",
      render: (value: number) => (
        <span className="font-mono whitespace-nowrap">{value} ₺</span>
      ),
    },
    {
      title: "Sipariş Durumu",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "date",
      key: "date",
      render: (value: string) => (
        <span className="font-extrabold">
          {moment(value).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "Müşteri",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => (
        <div className="flex flex-row flex-wrap justify-around">
          {record.status !== "ONAY BEKLENİYOR" ? (
            <span />
          ) : (
            <>
              <Button type="primary" className="!bg-red-500 !border-0">
                REDDET
              </Button>
              <Button>ONAYLA</Button>
            </>
          )}
        </div>
      ),
      width: "25%",
    },
  ];

  return (
    <div className="p-3">
      <h3 className="text-primary font-bold text-xl">
        ONAY BEKLEYEN SİPARİŞLERİM
      </h3>
      {productState.orders.length > 0 ? (
        <div className="w-full   flex flex-col items-center">
          <Table
            scroll={{ x: true }}
            pagination={false}
            className="w-full"
            columns={columns}
            dataSource={tableDatas}
          />
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center">
          <Empty
            description="Maalesef Onay Bekleyen Sipariş Yok"
            image={images.empty_box}
            imageStyle={{ width: "256px", height: "256px" }}
            style={{
              fontSize: "22px",
              fontWeight: "700",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyCustomerOrders;
