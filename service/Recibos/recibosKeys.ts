import { IRecibosCabeceraParams } from "@/models/IRecibo";

export const recibosKeys = {
  todos: () => ["recibos"] as const,
  obtenerRecibosCabeceras: () =>
    [...recibosKeys.todos(), "obtenerReciboCabecera"] as const,
  obtenerReciboCabecera: (params: IRecibosCabeceraParams) =>
    [...recibosKeys.obtenerRecibosCabeceras(), params] as const,
  formasPagos: () => [...recibosKeys.todos(), "formaPago"] as const,
  tarjetasCredito: () => [...recibosKeys.todos(), "tarjetaCredito"] as const,
  subirRecibos: () => [...recibosKeys.todos(), "subirRecibo"] as const,
};
