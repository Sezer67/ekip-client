import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { icons } from "../../../constants";
import { useAppWindowSize } from "../../../redux/hooks";
import { ProductStateType } from "../../../redux/types/product.type";
import ProductCard from "../ProductCard";

const HomeProducts: React.FC<{ products: ProductStateType[] }> = ({
  products,
}) => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(6);
  const [isChangePageNumber, setIsChangePageNumber] = useState<{
    isNext: boolean;
    isPrev: boolean;
  }>({ isNext: false, isPrev: false });
  const size = useAppWindowSize();

  useEffect(() => {
    if (size.width < 600) {
      setPerPage(2);
    } else if (size.width < 800) {
      setPerPage(3);
    } else if (size.width < 1200) {
      setPerPage(4);
    } else if (size.width > 1650) {
      setPerPage(6);
    } else if (size.width > 1400) {
      setPerPage(5);
    }
  }, [size]);

  useEffect(() => {
    const isNext = (page + 1) * perPage < products.length;
    const isPrev = page !== 0;
    setIsChangePageNumber({ isPrev, isNext });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, products.length]);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  if (products.length < 1) {
    return (
      <div className="mt-5 flex justify-center">
        <Empty
          description="Ürün Yok"
          image={icons.empty}
          imageStyle={{ width: "64px", height: "64px" }}
          style={{ fontSize: "16px", fontWeight: "700" }}
        />
      </div>
    );
  }

  // width e göre ayarlanacak
  return (
    <div className="px-4">
      <div className=" flex flex-row space-x-6  pt-6 pb-3 overflow-x-auto ">
        {products
          .slice(perPage * page, perPage * page + perPage)
          .map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
      </div>

      <div className="mb-3 mt-1 flex flex-row justify-end space-x-2">
        {isChangePageNumber.isPrev && (
          <button
            onClick={handlePrevPage}
            className="p-2 border border-primary rounded-sm"
          >
            <img src={icons.left_arrow} alt="left-icon" className="w-5 h-5" />
          </button>
        )}
        <div className="p-2 border border-primary">
          <span className="h-5 px-1">{page + 1}</span>
        </div>
        {isChangePageNumber.isNext && (
          <button
            onClick={handleNextPage}
            className="p-2 border border-primary rounded-sm"
          >
            <img src={icons.right_arrow} alt="left-icon" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
