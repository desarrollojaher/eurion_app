import {
  ISincronizarVerificaciones,
  ISincronizarVerificacionesEnviar,
} from "@/models/ISincronizar";
import { get, post } from "./config";
import { ITiposVerificaciones } from "@/models/ITiposVerificaciones";

export const sincronizacionApi = {
  obtenerVerificaciones: async () => {
    const res = await get<ISincronizarVerificaciones[]>("sincronizacion/verificaciones-vista");
    return res.data;
  },
  obtenerTipoVerificaciones: async () => {
    const res = await get<ITiposVerificaciones[]>("sincronizacion/tipo-verificaciones");
    return res.data;
  },
  sincronizarVerificacionEnviar: async (datos: ISincronizarVerificacionesEnviar) => {
    const res = await post("sincronizacion/recibirVerificacion", datos);
    return res.data;
  },
  sincronizarGestiones: async () => {
    const res = await get("sincronizacion/gestiones/obtener");
    return res.data;
  },
  
};
