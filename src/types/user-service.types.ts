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
      role: Role;
      profilePicture: string | null;
    }
  | { balance: number };

export type ResponseLoginType = Omit<UserType, "password">;
