import { IGestionesFiltro } from "@/models/IGestiones";

export const gestionesKeys = {
  todos: () => ["gestiones"] as const,
  gestionesCabecera: () =>
    [...gestionesKeys.todos(), "gestionCabecera"] as const,
  gestionCabecera: (params: IGestionesFiltro) =>
    [...gestionesKeys.gestionesCabecera(), params] as const,
};
