import { IAuth } from "@/models/IAuth";
import { post } from "./config";

export const authApi = {
  login: async (datos: IAuth) => {
    const res = await post("auth/login", datos);
    return res.data;
  },

  ping: async () => {
    const res = await post("auth/ping");
    return res.data;
  },
};
