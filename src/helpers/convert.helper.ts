import { OrderStateType } from "../redux/types/product.type";

export const convertOrderStateAfterUpdateOrder = (
  newOrder: OrderStateType,
  orderState: OrderStateType[]
): OrderStateType[] => {
  const newOrderArray = orderState.filter((order) => order.id !== newOrder.id);
  newOrderArray.push(newOrder);
  // en sona atması için
  return newOrderArray;
};
