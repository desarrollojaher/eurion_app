export const subirInformacionKeys = {
  todos: () => ["subirInformacion"] as const,
  subirDatos: () => [...subirInformacionKeys.todos(), "subirDato"] as const,
  actualizaciones: () =>
    [...subirInformacionKeys.todos(), "actualizacion"] as const,
};
