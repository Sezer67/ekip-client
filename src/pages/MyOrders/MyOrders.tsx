import { Empty } from "antd";
import React, { useEffect } from "react";
import OrderCard from "../../components/Order/OrderCard";
import { icons, images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/productSlice/productSlice";
import { productService } from "../../service";

const MyOrders = () => {
  const productState = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await productService.getMyOrders();
      dispatch(setOrders(data));
    };
    getOrders();
  }, [dispatch]);

  return (
    <div className="p-3 w-full flex flex-col items-center">
      <h3 className="text-primary font-bold  underline-offset-1 text-xl">
        SİPARİŞLERİM
      </h3>
      {productState.orders.length > 0 ? (
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col">
          {productState.orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center">
          <Empty
            description="Siparişiniz Yok"
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

export default MyOrders;
