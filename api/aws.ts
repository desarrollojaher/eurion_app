import {
  IAws,
  IGenerarPresignalResponse,
  IModulosResponse,
  IModuloSubir,
} from "@/models/IAws";
import { get, post } from "./config";

export const awsApi = {
  generarPresignal: async (data: IAws) => {
    const res = await post<IGenerarPresignalResponse>(
      "aws-service/presigned-url",
      data,
    );
    return res.data;
  },

  obtenerPath: async (data: IModuloSubir) => {
    const res = await get<IModulosResponse[]>("modulos/path", { params: data });
    return res.data;
  },
};
