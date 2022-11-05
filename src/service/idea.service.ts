import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import { IdeaCreateFormDataType, IdeaType } from "../types/idea-service.type";

export const createIdea = (
  data: IdeaCreateFormDataType
): AxiosPromise<IdeaType> => {
  return axiosInstance.post(`${api_url}/idea`, data);
};

export const getMyIdeas = (): AxiosPromise<IdeaType[]> => {
  return axiosInstance.get(`${api_url}/idea/@me`);
};

export const allIdeas = (): AxiosPromise<IdeaType[]> => {
  return axiosInstance.get(`${api_url}/idea/all`);
};
