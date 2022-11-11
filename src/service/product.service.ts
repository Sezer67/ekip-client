import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import {
  BestSalesType,
  FavoriteStateType,
  OrderStateType,
  ProductStateType,
  SalesResultType,
} from "../redux/types/product.type";
import { EvaluateResponseType, EvaluateType } from "../redux/types/user.types";
import {
  BestSalesResponseType,
  CreateOrderType,
  CreateProductType,
  SalesYearlyType,
  UpdateProductType,
} from "../types/product-service.type";

// query => category virgül ile ayrılmış string ile

export const getProducts = (url: string): AxiosPromise<ProductStateType[]> => {
  return axiosInstance.get(url);
};
export const getTrendProducts = (): AxiosPromise<ProductStateType[]> => {
  return axiosInstance.get(`${api_url}/product/trends`);
};
export const getNewProducts = (): AxiosPromise<ProductStateType[]> => {
  return axiosInstance.get(`${api_url}/product/new`);
};
export const getBestSalesProducts = (): AxiosPromise<
  BestSalesResponseType[]
> => {
  return axiosInstance.get(`${api_url}/order/best-sales`);
};

export const getSellerProducts = (): AxiosPromise<ProductStateType[]> => {
  return axiosInstance.get(`${api_url}/product/@me`);
};

export const getProductById = (id: string): AxiosPromise<ProductStateType> => {
  return axiosInstance.get(`${api_url}/product/${id}`);
};

export const updateProductById = (
  id: string,
  data: UpdateProductType
): AxiosPromise<ProductStateType> => {
  return axiosInstance.put(`${api_url}/product/${id}`, data);
};

export const createProdutc = (
  data: CreateProductType
): AxiosPromise<ProductStateType> => {
  return axiosInstance.post(`${api_url}/product`, data);
};

export const createOrder = (
  data: CreateOrderType
): AxiosPromise<OrderStateType> => {
  return axiosInstance.post(`${api_url}/order`, data);
};

export const updateOrderById = (
  id: string,
  data: { isAccept: boolean }
): AxiosPromise<OrderStateType> => {
  return axiosInstance.put(`${api_url}/order/${id}`, data);
};

export const getMyOrders = (): AxiosPromise<OrderStateType[]> => {
  return axiosInstance.get(`${api_url}/order/@me`);
};

export const getMyPendingOrders = (): AxiosPromise<OrderStateType[]> => {
  return axiosInstance.get(`${api_url}/order/@me/my-customer`);
};

export const deleteOrder = (id: string): AxiosPromise<string> => {
  return axiosInstance.delete(`${api_url}/order/${id}`);
};

export const getSales = (url: string): AxiosPromise<SalesResultType> => {
  return axiosInstance.get(url);
};

export const getSalesYearly = (): AxiosPromise<SalesYearlyType[]> => {
  return axiosInstance.get(`${api_url}/order/@me/sales/year`);
};

export const getBestSaledProduct = (): AxiosPromise<BestSalesResponseType> => {
  return axiosInstance.get(`${api_url}/order/@me/sales/stat`);
};

export const getAllSalesByDate = (data: {
  startDate: Date;
  endDate: Date;
}): AxiosPromise<OrderStateType[]> => {
  return axiosInstance.post(`${api_url}/order/all-sales`, data);
};

export const addProduuctToFavorites = (data: {
  productId: string;
}): AxiosPromise<FavoriteStateType> => {
  return axiosInstance.post(`${api_url}/favorite`, data);
};

export const getFavorites = (): AxiosPromise<FavoriteStateType[]> => {
  return axiosInstance.get(`${api_url}/favorite`);
};

export const removeProductToFavorites = (id: string): AxiosPromise<string> => {
  return axiosInstance.delete(`${api_url}/favorite/${id}`);
};

// satıcının satın aldığı ürünler (değenlendirme modal i kontrolü için)
export const getEvaluatedProductsByUser = (): AxiosPromise<
  EvaluateResponseType[]
> => {
  return axiosInstance.get(`${api_url}/product/rate/isRating`);
};

export const setEveluateProductById = (
  id: string,
  dto: { rating: number }
): AxiosPromise<number> => {
  return axiosInstance.put(`${api_url}/product/rate/${id}`, dto);
};
