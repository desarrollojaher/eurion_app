import { IComprobanteObtenerParams } from "@/models/IComprobante";

export const comprobantesKeys = {
  todos: () => ["comprobantes"] as const,
  obtenerGenerales: () => [...comprobantesKeys.todos(), "obtenerGeneral"] as const,
  obtenerGeneral: (params: IComprobanteObtenerParams) =>
    [...comprobantesKeys.obtenerGenerales(), params] as const,
};
