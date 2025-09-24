import {
  IGestionCabeceraParams,
  IGestionesAnterioresParams,
} from "@/models/IGestiones";

export const gestionesKeys = {
  todos: () => ["gestiones"] as const,
  gestionesCabecera: () =>
    [...gestionesKeys.todos(), "gestionCabecera"] as const,
  gestionCabecera: (params: IGestionCabeceraParams) =>
    [...gestionesKeys.gestionesCabecera(), params] as const,
  gestionesPasadas: () => [...gestionesKeys.todos(), "gestionPasada"] as const,
  gestionPasada: (params: IGestionesAnterioresParams) =>
    [...gestionesKeys.gestionesPasadas(), params] as const,
};
