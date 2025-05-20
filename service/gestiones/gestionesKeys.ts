export const gestionesKeys = {
  todos: () => ["gestiones"] as const,
  gestionesCabecera: () =>
    [...gestionesKeys.todos(), "gestionCabecera"] as const,
  gestionCabecera: (params: any) =>
    [...gestionesKeys.gestionesCabecera(), params] as const,
};
