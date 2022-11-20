import { Role } from "../../enums/role.enum";

export const a = "";

export const formDatas = {
  names: {
    firstName: {
      label: "İsim",
      name: "firstName",
    },
    lastName: {
      label: "Soyisim",
      name: "lastName",
    },
    username:{
      label:"Kullanıcı Adı",
      name:"username"
    },
    email: {
      label: "Mail Adresi",
      name: "email",
    },
    role: {
      label: "Hesap Türü",
      name: "role",
    },
    password: {
      label: "Şifre",
      name: "password",
    },
  },
  rules: {
    firstName: {
      message: "İsim zorunlu!",
    },
    lastName: {
      message: "Soyisim zorun!",
    },
    email: {
      message: "Mail adresi zorunlu!",
      typeMessage: "Geçersiz mail adresi!",
    },
    password: {
      message: "Şifre alanı zorunlu!",
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
