import { IDireccionParams } from "@/models/IDireccion";

export const direccionKeys = {
  todos: () => ["direccion"] as const,
  obtenerDirecciones: () => [...direccionKeys.todos(), "obtenerDireccion"] as const,
  obtenerDireccion: (params: IDireccionParams) =>
    [...direccionKeys.obtenerDirecciones(), params] as const,
};
