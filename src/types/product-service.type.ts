import { ProductStateType } from "../redux/types/product.type";
import { UserType } from "../redux/types/user.types";

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
  description: string;
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
  description?: string;
  categories?: string[];
};

export type SalesYearlyType = {
  month: Date;
  taking: number;
};

export type BestSalesResponseType = {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  id: string;
  price: number;
  stock: number;
  images: string | null;
  name: string;
  created_at: Date;
  show_count: number;
  rating_count:number;
  rating_point:number;
  categoryIds: string[];
  sum: string;
  count: string;
};

export type CommentCreateType = {
  productId: string;
  comment: string;
  ref?: string;
};

export type CommentType = {
  id: string;
  comment: string;
  createdAt: Date;
  productId: string;
  ref?: string;
  userId: Pick<UserType, "id" | "firstName" | "lastName" | "profilePicture">;
};

export type ProductKeysType = keyof ProductStateType;
