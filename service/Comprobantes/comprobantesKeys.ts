import {
  IComprobanteDetalleParams,
  IComprobanteObtenerParams,
} from "@/models/IComprobante";

export const comprobantesKeys = {
  todos: () => ["comprobantes"] as const,
  obtenerGenerales: () =>
    [...comprobantesKeys.todos(), "obtenerGeneral"] as const,
  obtenerGeneral: (params: IComprobanteObtenerParams) =>
    [...comprobantesKeys.obtenerGenerales(), params] as const,
  detalles: () => [...comprobantesKeys.todos(), "detalle"] as const,
  detalle: (params: IComprobanteDetalleParams) =>
    [...comprobantesKeys.detalles(), params] as const,
};
