import { Role } from "../../enums/role.enum";

export type UserStateType = {
  user: UserType;
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
