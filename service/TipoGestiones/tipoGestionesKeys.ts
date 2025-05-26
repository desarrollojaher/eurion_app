export const tipoGestionesKeys = {
  todos: () => ["tipoGestion"] as const,
  tipoGestiones: () => [...tipoGestionesKeys.todos(), "tipoGestion"] as const,
};
