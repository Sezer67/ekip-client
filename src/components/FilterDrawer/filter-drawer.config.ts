import React from "react";
import { ProductStateType } from "../../redux/types/product.type";

export type PropType = {
  title: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterProducts: (filterProducts: ProductStateType[]) => void;
  setActiveTab: (activeTab: string) => void;
};

export const styles = {
  headerStyle: {
    backgroundColor: "#1D2639",
    color: "white",
  } as React.CSSProperties,
  bodyStyle: {
    backgroundColor: "#f2f2f2",
  } as React.CSSProperties,
};

export type FormDataType = {
  name: string;
  categories: SelectType[];
  startPrice: number;
  endPrice: number;
  isShowCount: boolean;
};

type SelectType = {
  key: string;
  label: string;
  value: string;
};
