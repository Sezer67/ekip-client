import { Button, Empty, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { gifs, images } from "../../constants";
import { convertHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/productSlice/productSlice";
import {
  setIsLoading,
  setNotification,
} from "../../redux/userSlice/notificationSlice";
import { setUserPlusBalance } from "../../redux/userSlice/userSlice";
import { productService } from "../../service";
import {
  OrderTableDataTypes,
  StatusFilterDatas,
} from "./my-customer-order.config";

const MyCustomerOrders = () => {
  const [tableDatas, setTableDatas] = useState<OrderTableDataTypes[]>([]);
  const productState = useAppSelector((state) => state.product);
  const loading = useAppSelector((state) => state.notification.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOrders = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await productService.getMyPendingOrders();
        dispatch(setOrders(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getOrders();
  }, [dispatch]);

  useEffect(() => {
    if (productState.orders.length > 0) {
      const data: OrderTableDataTypes[] = [];
      productState.orders.forEach((order) => {
        data.push({
          id: order.id,
          actions: "",
          customer: order.customerId.firstName.concat(
            " ",
            order.customerId.lastName
          ),
          date: order.createdAt.toString(),
          answerDate: order.answerAt?.toString(),
          name: order.productId.name,
          piece: order.piece,
          takings: order.piece * order.productId.price,
          status: order.isAnswer
            ? order.isAccept
              ? "ONAYLANDI"
              : "REDDED??LD??"
            : "ONAY BEKLEN??YOR",
        });
      });
      setTableDatas(data);
    }
  }, [productState.orders]);

  const handleUpdate = async (isAccept: boolean, id: string) => {
    try {
      const { data } = await productService.updateOrderById(id, { isAccept });
      const orders = convertHelper.convertOrderStateAfterUpdateOrder(
        data,
        productState.orders
      );
      if (isAccept) {
        const order = productState.orders.find((o) => o.id === id);
        if (!order) return;
        dispatch(
          setUserPlusBalance({ balance: order.piece * order.productId.price })
        );
      }
      dispatch(setOrders(orders));
      dispatch(
        setNotification({
          message: "G??ncelleme Ba??ar??l??",
          description: `Sipari?? ${isAccept ? "Onayland??" : "Reddedildi"}`,
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "G??ncelleme Ba??ar??s??z",
          description: error.message[0],
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  const columns: ColumnsType<OrderTableDataTypes> = [
    {
      title: "??r??n Ad??",
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
      sorter: (a, b) => a.piece - b.piece,
    },
    {
      title: "Has??lat",
      dataIndex: "takings",
      key: "takings",
      render: (value: number) => (
        <span className="font-mono whitespace-nowrap">{value} ???</span>
      ),
      sorter: (a, b) => a.takings - b.takings,
    },
    {
      title: "Sipari?? Durumu",
      dataIndex: "status",
      key: "status",
      filters: StatusFilterDatas,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Sipari?? Tarihi",
      dataIndex: "date",
      key: "date",
      render: (value: string) => (
        <span className="font-extrabold">
          {moment(value).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "M????teri",
      dataIndex: "customer",
      key: "customer",
      render: (value) => (
        <span className="text-secondary font-semibold">{value}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => (
        <div className="flex flex-row flex-wrap justify-around">
          {record.status !== "ONAY BEKLEN??YOR" ? (
            <Tooltip title="????lem Tarihiniz">
              <span className="font-extrabold">
                {moment(record.answerDate).format("DD/MM/YYYY HH:mm")}
              </span>
            </Tooltip>
          ) : (
            <>
              <Button
                onClick={() => handleUpdate(false, record.id)}
                type="primary"
                className="!bg-red-500 !border-0"
              >
                REDDET
              </Button>
              <Button onClick={() => handleUpdate(true, record.id)}>
                ONAYLA
              </Button>
            </>
          )}
        </div>
      ),
      width: "25%",
    },
  ];
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="p-3">
      <h3 className="text-primary font-bold text-xl">
        M????TER??LER??M??N S??PAR????LER??
      </h3>
      {productState.orders.length > 0 ? (
        <div className="w-full   flex flex-col items-center">
          <Table
            locale={{
              triggerAsc: "Artan S??ralama",
              triggerDesc: "Azalan S??ralama",
              cancelSort: "S??ralamay?? ??ptal Et",
              filterReset: false,
              filterConfirm: "Uygula",
            }}
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
            description="Maalesef Onay Bekleyen Sipari?? Yok"
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
