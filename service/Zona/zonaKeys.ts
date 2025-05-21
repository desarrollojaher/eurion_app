export const zonaKeys = {
  todos: () => ["zonas"] as const,
  filtros: () => [...zonaKeys.todos(), "filtro"] as const,
};
