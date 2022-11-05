import { Role, RoleText } from "../../enums/role.enum";

export const colors = ["bg-pink", "bg-primary", "bg-thirdy"];
export const textColors = ["text-primary", "text-light", "text-primary"];

export const RoleFilterStatus = [
  {
    text: RoleText.customer,
    value: Role.Customer,
  },
  {
    text: RoleText.seller,
    value: Role.Seller,
  },
];
