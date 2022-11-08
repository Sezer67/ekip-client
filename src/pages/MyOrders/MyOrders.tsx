import { Empty } from "antd";
import React, { useEffect } from "react";
import OrderCard from "../../components/Order/OrderCard";
import { gifs, images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/productSlice/productSlice";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";

const MyOrders = () => {
  const productState = useAppSelector((state) => state.product);
  const loading = useAppSelector((state) => state.notification.isLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getOrders = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await productService.getMyOrders();
        dispatch(setOrders(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getOrders();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="p-3 w-full flex flex-col items-center">
      <h3 className="text-primary font-bold  underline-offset-1 text-xl">
        SİPARİŞLERİM
      </h3>
      {productState.orders.length > 0 ? (
        <div className="w-full md:w-4/5 lg:w-3/4 max-w-[800px] flex flex-col">
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
