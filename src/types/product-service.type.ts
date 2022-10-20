import { ProductStateType } from "../redux/types/product.type";

export type QueryProductType = {
  name?: string;
  categories?: string;
  startPrice?: number;
  endPrice?: number;
  isShowCount?: boolean;
};

export type CreateProductType = {
  images: string[] | null;
  name: string;
  price: number;
  stock: number;
  categories: string[];
};

export type CreateOrderType = {
  productId: string;
  piece: number;
};

export type UpdateProductType = {
  price?: number;
  showCount?: number;
  stock?: number;
  images?: string[] | null;
  categories?: string[];
};

export type SalesYearlyType = {
  month: Date;
  taking: number;
};

export type ProductKeysType = keyof ProductStateType;
