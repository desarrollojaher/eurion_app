import {
  ITipoDatoCabeceraParams,
  ITipoGestionDetalleParams,
} from "@/models/ITiposGestiones";

export const tipoGestionesKeys = {
  todos: () => ["tipoGestiones"] as const,
  cabeceras: () => [...tipoGestionesKeys.todos(), "cabecera"] as const,
  cabecera: (params: ITipoDatoCabeceraParams) =>
    [...tipoGestionesKeys.cabeceras(), params] as const,
  detalles: () => [...tipoGestionesKeys.todos(), "detalle"] as const,
  detalle: (params: ITipoGestionDetalleParams) =>
    [...tipoGestionesKeys.detalles(), params] as const,
};
