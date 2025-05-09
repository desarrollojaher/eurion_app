import {
  IVerificacionDetallesParams,
  IVerificacionesCabeceraParams,
} from "@/models/IVerificaciones";

export const verificacionesKeys = {
  todos: () => ["verificaciones"] as const,
  cabeceras: () => [...verificacionesKeys.todos(), "cabecera"] as const,
  cabecera: (params: IVerificacionesCabeceraParams) =>
    [...verificacionesKeys.cabeceras(), params] as const,
  detalles: () => [...verificacionesKeys.todos(), "detalle"] as const,
  detalle: (params: IVerificacionDetallesParams) =>
    [...verificacionesKeys.detalles(), params] as const,
};
