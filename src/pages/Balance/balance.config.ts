export type PaymentDataType = {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
  focused: "name" | "expiry" | "number" | "cvc";
};
