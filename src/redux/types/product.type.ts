import { UserStateType, UserType } from "./user.types";

export type ProductStateType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[] | null;
  categories: string[];
  createdAt: Date;
  showCount: number;
  ownerId: Omit<
    UserType,
    "token" | "profilePicture" | "username" | "email" | "role"
  >;
};
