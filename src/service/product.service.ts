import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import {
  OrderStateType,
  ProductStateType,
  SalesResultType,
  SalesType,
} from "../redux/types/product.type";
import {
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

export const getSales = (): AxiosPromise<SalesResultType> => {
  return axiosInstance.get(`${api_url}/order/@me/sales`);
};

export const getSalesYearly = (): AxiosPromise<SalesYearlyType[]> => {
  return axiosInstance.get(`${api_url}/order/@me/sales/year`);
};
