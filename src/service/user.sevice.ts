import axios, { AxiosPromise, AxiosResponse } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import {
  ResponseLoginType,
  UserLoginType,
  UserRegisterType,
  UserUpdateType,
} from "../types/user-service.types";

const url = api_url;

export const register = async (data: UserRegisterType) => {
  return axiosInstance.post(`${url}/user`, data);
};

export const login = (data: UserLoginType): AxiosPromise<ResponseLoginType> => {
  return axiosInstance.post(`${url}/auth/login`, data);
};

export const getLoggedUser = (): AxiosPromise<ResponseLoginType> => {
  return axiosInstance.get(`${url}/auth`);
};

export const updateUser = (
  id: string,
  data: UserUpdateType
): AxiosPromise<ResponseLoginType> => {
  return axiosInstance.put(`${url}/user/${id}`, data);
};

export const logout = (): AxiosPromise<{ message: string }> => {
  return axiosInstance.get(`${url}/auth/logout`);
};

export const getP = () => {
  return axiosInstance.get(`${url}/product`);
};
