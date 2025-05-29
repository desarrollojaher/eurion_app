export const sincronizacionKeys = {
  todos: () => ["sincronizacion"] as const,
  fechas: () => [...sincronizacionKeys.todos(), "fechas"] as const,
};
