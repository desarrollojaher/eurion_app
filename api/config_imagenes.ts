import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://appinprodpriv.jaher.com.ec/api-cloud",
  timeout: 180000,
});

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

const api: ApiMethods = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
};

axiosInstance.interceptors.request.use(async (config) => {
  config.headers["x-access-key"] = `CLOUD-4d3e5b1a-8c9f-4b2d-a1e6-7f8a9c0b1d2e`;

  return config;
});

export const getImagen = api.get;
export const postImagen = api.post;
export const patchImagen = api.patch;
