import { Role } from "../enums/role.enum";
import { UserType } from "../redux/types/user.types";

export type UserRegisterType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
};

export type UserLoginType = {
  username?: string;
  email?: string;
  password: string;
};

export type UserUpdateType =
  | {
      firstName: string;
      lastName: string;
      password?: string;
      email: string;
      profilePicture: string | null;
    }
  | { balance: number }
  | { isFreeze: boolean };

export type ResponseLoginType = Omit<UserType, "password">;
