import { OrderStateType } from "../redux/types/product.type";
import {
  CreateFollowResponseType,
  FollowType,
} from "../redux/types/user.types";

export const convertOrderStateAfterUpdateOrder = (
  newOrder: OrderStateType,
  orderState: OrderStateType[]
): OrderStateType[] => {
  const newOrderArray = orderState.filter((order) => order.id !== newOrder.id);
  newOrderArray.push(newOrder);
  // en sona atması için
  return newOrderArray;
};

export const convertResponseFollowToReduxFollow = (
  follow: CreateFollowResponseType
): FollowType => {
  return {
    id: follow.followedId.id,
    email: follow.followedId.email,
    firstName: follow.followedId.firstName,
    lastName: follow.followedId.lastName,
  };
};
