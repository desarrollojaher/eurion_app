import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// const axiosInstance = axios.create({
//   //baseURL: "http://172.17.28.14:5133/api-eurionapp",
//   // baseURL: "http://localhost:5133/api-eurionapp",
//   // baseURL: "https://app.jmsg.ec/bedapi/eurionapp",
//   // baseURL: "https://appcert.jmsg.ec/api/eurionapp",
//   baseURL: "https://apiscoreprod.jmsg.ec/api-eurionapp",
//   timeout: 180000,
//   headers: {
//     Connection: "close",
//   },
// });

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem("token");

  const instance = axios.create({
    baseURL: "http://172.17.28.14:5133/api/eurionapp",
    timeout: 90000, // mucho mejor que 180000
    headers: {
      Connection: "close", // fuerza nueva conexión
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return instance;
};

type ApiMethods = {
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
};

export const get: ApiMethods["get"] = async (url, config) => {
  const axiosInstance = await createAxiosInstance();
  return axiosInstance.get(url, config);
};

export const post: ApiMethods["post"] = async (url, data, config) => {
  const axiosInstance = await createAxiosInstance();
  return axiosInstance.post(url, data, config);
};

export const patch: ApiMethods["patch"] = async (url, data, config) => {
  const axiosInstance = await createAxiosInstance();
  return axiosInstance.patch(url, data, config);
};

// axiosInstance.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

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

// export const get = api.get;
// export const post = api.post;
// export const patch = api.patch;
