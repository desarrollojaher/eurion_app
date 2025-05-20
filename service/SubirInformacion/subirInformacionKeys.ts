export const subirInformacionKeys = {
  todos: () => ["subirInformacion"] as const,
  subirDatos: () => [...subirInformacionKeys.todos(), "subirDato"] as const,
};
