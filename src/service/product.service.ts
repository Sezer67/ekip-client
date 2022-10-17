import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import { ProductStateType } from "../redux/types/product.type";
import { CreateProductType } from "../types/product-service.type";

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
