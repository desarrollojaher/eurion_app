import { ITelefonoParams } from "@/models/ITelefono";

export const telefonoKeys = {
  todos: () => ["telefono"] as const,
  obtenerTelefonos: () => [...telefonoKeys.todos(), "obtenerTelefono"] as const,
  obtenerTelefono: (params: ITelefonoParams) =>
    [...telefonoKeys.obtenerTelefonos(), params] as const,
};
