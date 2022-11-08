import { UserType } from "./user.types";

type UserFilterVariableType = Omit<
  UserType,
  | "token"
  | "profilePicture"
  | "username"
  | "email"
  | "role"
  | "balance"
  | "isFreeze"
>;

export type ProductStateType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[] | null;
  categories: string[];
  createdAt: Date;
  showCount: number;
  ownerId: UserFilterVariableType;
};

export type OrderStateType = {
  id: string;
  isAccept: boolean;
  isAnswer: boolean;
  createdAt: Date;
  answerAt: Date | null;
  piece: number;
  totalPrice: number;
  customerId: UserFilterVariableType;
  ownerId: UserFilterVariableType;
  productId: ProductStateType;
};
export type SalesType = {
  id: string;
  answerAt: Date;
  piece: number;
  totalPrice: number;
  customerId: UserFilterVariableType;
  ownerId: UserFilterVariableType;
  productId: ProductStateType;
};
export type SalesStateType = {
  sales: SalesType[];
  count: number;
  filterTotalTaking: number;
};
export type SalesResultType = SalesStateType;
export type BestSalesType = ProductStateType & {
  sum: number;
  count: number;
};

export type FavoriteStateType = {
  id: string;
  productId: ProductStateType;
};
