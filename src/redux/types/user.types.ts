import { Role } from "../../enums/role.enum";

export type UserStateType = {
  user: UserType;
  allUsers: UserType[];
  followers: FollowType[];
  evaluateProducts: EvaluateType[];
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string | null;
  role: Role;
  balance: number;
  isFreeze: boolean;
  token: string | undefined;
};

export type FollowType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
};

export type CreateFollowResponseType = {
  id: string;
  followerId: UserType;
  followedId: UserType;
};

export type GetMyFollowedSellerResponseType = {
  id: string;
  followedId: FollowType;
};

export type GetMyFollowersResponseType = {
  id: string;
  followerId: FollowType;
};

export type EvaluateType = {
  userId: string;
  productId: string;
  isRating: boolean;
};
export type EvaluateResponseType = {
  userId: {
    id: string;
  };
  productId: {
    id: string;
  };
  isRating: boolean;
};
