import {
  BestSalesType,
  OrderStateType,
  ProductStateType,
} from "../redux/types/product.type";
import {
  CreateFollowResponseType,
  EvaluateResponseType,
  EvaluateType,
  FollowType,
} from "../redux/types/user.types";
import { BestSalesResponseType } from "../types/product-service.type";

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
    profilePicture: follow.followedId.profilePicture,
  };
};

export const convertBestSalesResponseToProducts = (
  datas: BestSalesResponseType[]
): BestSalesType[] => {
  const products: BestSalesType[] = [];

  datas.forEach((data) => {
    const product: BestSalesType = {
      id: "",
      categories: [],
      createdAt: new Date(),
      images: null,
      name: "",
      ownerId: { id: "", firstName: "", lastName: "" },
      price: 0,
      showCount: 0,
      stock: 0,
      count: 0,
      sum: 0,
      description: "",
      ratingCount: 0,
      ratingPoint: 0,
    };
    Object.keys(data).forEach((value) => {
      switch (value) {
        case "user_id":
          product.ownerId.id = data[value];
          break;

        case "user_first_name":
          product.ownerId.firstName = data[value];
          break;
        case "user_last_name":
          product.ownerId.lastName = data[value];
          break;
        case "id":
          product.id = data[value];
          break;
        case "price":
          product.price = data[value];
          break;
        case "stock":
          product.stock = data[value];
          break;
        case "images":
          product.images =
            data[value] !== null ? data[value]!.split(",") : null;
          break;
        case "name":
          product.name = data[value];
          break;
        case "created_at":
          product.createdAt = data[value];
          break;
        case "categoryIds":
          product.categories = data[value];
          break;
        case "sum":
          product.sum = Number(data[value]);
          break;
        case "count":
          product.count = Number(data[value]);
          break;
        case "show_count":
          product.showCount = data[value];
          break;
        default:
          break;
      }
    });
    products.push(product);
  });

  return products;
};

export const convertEvaluateProductToReduxType = (
  data: EvaluateResponseType[]
): EvaluateType[] => {
  const result: EvaluateType[] = [];

  data.forEach((el) => {
    const value = {
      userId: el.userId.id,
      productId: el.productId.id,
      isRating: el.isRating,
    };
    result.push(value);
  });
  return result;
};
