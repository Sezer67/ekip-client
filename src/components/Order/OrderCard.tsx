import { Button, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { imageHelper } from "../../helpers";
import { useAppDispatch, useAppWindowSize } from "../../redux/hooks";
import { deleteOrder } from "../../redux/productSlice/productSlice";
import { OrderStateType } from "../../redux/types/product.type";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";

type PropsType = {
  order: OrderStateType;
};

const OrderCard: React.FC<PropsType> = ({ order }) => {
  const dispatch = useAppDispatch();

  const size = useAppWindowSize();

  let bg = "bg-slate-50";
  let orderStatus = "Satıcıdan Onay Bekleniyor";
  let actionButtonText = "İPTAL ET";
  if (order.isAnswer) {
    actionButtonText = "SİL";
    if (order.isAccept) {
      bg = "bg-green-100";
      orderStatus = "Sipariş Onaylandı";
    } else {
      bg = "bg-red-100";
      orderStatus = "Sipariş Reddedildi";
    }
  }

  const handleDelete = async () => {
    try {
      const { data } = await productService.deleteOrder(order.id);
      dispatch(deleteOrder(data));
      dispatch(
        setNotification({
          message: "İşlem Başarılı",
          description: "Ürün, sipariş listenizden kaldırıldı",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "Ürün silinemedi",
          description: error.response.data.message[0],
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  return (
    <div className={`w-full mt-6 py-4 px-7 rounded-sm shadow-sm ${bg}`}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center mr-6">
          {size.width > 500 && order.productId.images && (
            <div className=" flex justify-center items-center mr-6">
              <img
                src={imageHelper.getBase64(order.productId.images[0])}
                alt=""
                className="w-14 h-14 object-contain"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-orange font-semibold text-lg">
              {order.productId.name.toUpperCase()}
            </span>
            <div className="flex flex-row space-x-3">
              <span className="text-secondary  font-mono font-semibold">
                {order.piece} adet
              </span>

              <span className="text-secondary whitespace-nowrap font-mono font-semibold">
                {order.piece * order.productId.price} ₺
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-6">
          {size.width > 500 && (
            <Tooltip title="Sipariş Durumu">
              <span className="text-sm text-primary">{orderStatus}</span>
            </Tooltip>
          )}
          <div className="flex flex-col space-y-2">
            <Tooltip placement="right" title="Sipariş Tarihi">
              <span className="whitespace-nowrap font-extrabold">
                {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
            </Tooltip>
            <Tooltip placement="right" title="Satıcı Yanıt Tarihi">
              <span className="whitespace-nowrap font-extrabold">
                {order.answerAt
                  ? moment(order.answerAt).format("DD/MM/YYYY HH:mm")
                  : "Bekleniyor"}
              </span>
            </Tooltip>
            <Button
              onClick={handleDelete}
              type="primary"
              className="!bg-red-500 !border-0"
            >
              {actionButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
