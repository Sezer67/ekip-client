import { roleEnum } from "../../enums";

export type FormValuesType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: roleEnum.Role;
  password: string;
};

export enum FormValuesEnum {
  firstName = "firstName",
  lastName = "lastName",
  username = "username",
  email = "email",
  role = "role",
  password = "password",
}

export const errorMessages = {
  required: (label: string) => `${label} alanı zorunlu!`,
  types: {
    email: `This is not a valid email!`,
  },
};
