import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";
import { get } from "./config";

export const sincronizacionApi = {
  verificaciones: async () => {
    const res = await get<ISincronizarVerificaciones[]>(
      "sincronizacion/verificaciones"
    );
    return res.data;
  },
  clientes: async () => {
    const res = await get<ISincronizarClientes[]>("sincronizacion/clientes");
    return res.data;
  },
  conyugue: async () => {
    const res = await get<ISincronizarConyugue[]>("sincronizacion/conyugue");
    return res.data;
  },
  direcciones: async () => {
    const res = await get<ISincronizarDirecciones[]>(
      "sincronizacion/direcciones"
    );
    return res.data;
  },
  zona: async () => {
    const res = await get<ISincronizarZona[]>("sincronizacion/zona");
    return res.data;
  },
};
