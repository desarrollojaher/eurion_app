import { IReferenciaParams } from "@/models/IReferencia";

export const referenciasKeys = {
  todos: () => ["referencias"] as const,
  obtenerReferencias: () => [...referenciasKeys.todos(), "obtenerReferencia"] as const,
  obtenerReferencia: (params: IReferenciaParams) =>
    [...referenciasKeys.obtenerReferencias(), params] as const,
};
