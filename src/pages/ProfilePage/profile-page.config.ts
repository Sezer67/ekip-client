import { Role } from "../../enums/role.enum";

export const a = "";

export const formDatas = {
  names: {
    firstName: {
      label: "First Name",
      name: "firstName",
    },
    lastName: {
      label: "Last Name",
      name: "lastName",
    },
    email: {
      label: "Email",
      name: "email",
    },
    role: {
      label: "Role",
      name: "role",
    },
    password: {
      label: "Password",
      name: "password",
    },
  },
  rules: {
    firstName: {
      message: "First Name is required!",
    },
    lastName: {
      message: "First Name is required!",
    },
    email: {
      message: "Email is required!",
      typeMessage: "This is not a valid email!",
    },
    password: {
      message: "Password is required!",
    },
  },
};

export const roleValues = [
  { label: "Seller", value: "seller" },
  { label: "Customer", value: "customer" },
];

export type FormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};
