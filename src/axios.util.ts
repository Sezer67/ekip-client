import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { Path } from "./enums/path.enum";
import { storageHelper } from "./helpers";

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) {
    storageHelper.setKeyWithValue("token", "");
    if (window.location.pathname !== Path.LOGIN)
      window.location.assign(Path.LOGIN);

    return error;
  }
});

const setApiToken = (token: string) => {
  axiosInstance.defaults.headers.common["token"] = token;
};

export { axiosInstance, setApiToken };
