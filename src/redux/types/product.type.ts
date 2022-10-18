import { UserStateType, UserType } from "./user.types";

type UserFilterVariableType = Omit<
  UserType,
  "token" | "profilePicture" | "username" | "email" | "role"
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
  customerId: UserFilterVariableType;
  ownerId: UserFilterVariableType;
  productId: ProductStateType;
};
