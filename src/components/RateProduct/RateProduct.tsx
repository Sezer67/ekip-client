import { Button, Rate } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setProductRating } from "../../redux/productSlice/productSlice";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { setEvaluateProductByProductId } from "../../redux/userSlice/userSlice";
import { productService } from "../../service";

type PropsType = {
  setVisible: (visible: boolean) => void;
  productId: string;
};

const RateProduct: React.FC<PropsType> = ({ setVisible, productId }) => {
  const [rate, setRate] = useState<number>(5);

  const dispatch = useAppDispatch();
  const handleClose = () => {
    setVisible(false);
  };

  const handleEveluate = async () => {
    try {
      const { data } = await productService.setEveluateProductById(productId, {
        rating: rate,
      });
      dispatch(setEvaluateProductByProductId({ id: productId }));
      dispatch(setProductRating({ id: productId, rating: data }));
      dispatch(
        setNotification({
          message: "Teşekkürler",
          description: "Ürün Değerlendirmenizi aldık.",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
      handleClose();
    } catch (error) {
      dispatch(
        setNotification({
          message: "Üzgünüz",
          description: "Ürün Değerlendirmenizi alamadık.",
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="w-full pb-4">
      {/* Header */}
      <div className="w-full p-5 bg-primary flex flex-row justify-between">
        <h2 className="text-light text-lg mb-0">Ürün Değerlendirmesi</h2>
        <button onClick={handleClose}>
          <span className="text-2xl text-light ">&#10005;</span>
        </button>
      </div>
      {/* Body */}
      <div className="p-5">
        <p className="text-primary text-base">
          Bu ürünü satın aldınız. Ürünü 5 üzerinden kaç puan ile
          değerlendirirsiniz ?
        </p>
        <Rate allowHalf defaultValue={5} onChange={(value) => setRate(value)} />
        <p className="mt-1 text-secondary ">
          Sayfanın en alt kısmına gidip ürün hakkında 'Satın Alan Kişi' ünvanı
          ile yorum yapabilirsiniz.
        </p>
      </div>
      {/* Footer */}
      <div className="w-full border h-[.1px]" />
      <div className="w-full mt-4 px-5 flex flex-row justify-end">
        <Button onClick={handleClose} className="mr-3">
          Daha Sonra
        </Button>
        <Button onClick={handleEveluate} type="primary">
          Gönder
        </Button>
      </div>
    </div>
  );
};

export default RateProduct;
