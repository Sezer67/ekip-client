import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import { OrderStateType, ProductStateType } from "../redux/types/product.type";
import {
  CreateOrderType,
  CreateProductType,
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

export const getSellerProducts = (): AxiosPromise<ProductStateType[]> => {
  return axiosInstance.get(`${api_url}/product/@me`);
};

export const getProductById = (id: string): AxiosPromise<ProductStateType> => {
  return axiosInstance.get(`${api_url}/product/${id}`);
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

export const getMyOrders = (): AxiosPromise<OrderStateType[]> => {
  return axiosInstance.get(`${api_url}/order/@me`);
};

export const getMyPendingOrders = (): AxiosPromise<OrderStateType[]> => {
  return axiosInstance.get(`${api_url}/order/@me/my-customer`);
};

export const deleteOrder = (id: string): AxiosPromise<string> => {
  return axiosInstance.delete(`${api_url}/order/${id}`);
};
