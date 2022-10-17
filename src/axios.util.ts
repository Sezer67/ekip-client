import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Request use", config.headers);
  return config;
});

const setApiToken = (token: string) => {
  console.log("set api token ", token);
  axiosInstance.defaults.headers.common["token"] = token;
};

export { axiosInstance, setApiToken };
