import { NavigateFunction, NavigateOptions } from "react-router-dom";

type ParamsType = {
  [key: string]: string;
};

export const addQueryToUrl = (url: string, params: ParamsType) => {
  let newUrl = url;
  Object.keys(params).forEach((key, index) => {
    if (params[key] === "") return;
    if (!newUrl.includes("?")) {
      newUrl += `?${key}=${params[key]}`;
    } else {
      newUrl += `&${key}=${params[key]}`;
    }
  });
  return newUrl;
};

export const navigation = (
  navigate: NavigateFunction,
  url: string,
  options?: NavigateOptions
) => {
  if (options) {
    return navigate(url, { ...options });
  }
  return navigate(url);
};
