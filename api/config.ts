import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://172.17.28.3:5133/api/eurionapp",
  baseURL: "https://app.jmsg.ec/bedapi/eurionapp",
  timeout: 30000,
});

type ApiMethods = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
};

const api: ApiMethods = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // todo poner la reidireccion
//       console.error("No autorizado, redirigiendo al login...");
//     }
//     return Promise.reject(error);
//   }
// );

export const get = api.get;
export const post = api.post;
export const patch = api.patch;
