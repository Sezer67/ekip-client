import { Role } from "../../enums/role.enum";

export type UserStateType = {
  user: UserType;
  followers: FollowType[];
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
  token: string | undefined;
};

export type FollowType = {
  id: string;
  firstName: string;
  lastName: String;
  email: string;
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
