import { IGestionCabeceraParams } from "@/models/IGestiones";

export const recibosKeys = {
  todos: () => ["recibos"] as const,
  recibosCabecera: () => [...recibosKeys.todos(), "reciboCabecera"] as const,
  reciboCabecera: (params: IGestionCabeceraParams) => [...recibosKeys.recibosCabecera(), params] as const,
  obtenerRecibos: () => [...recibosKeys.todos(), "obtenerRecibo"] as const
};
