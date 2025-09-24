export const tiposReferenciaKeys = {
  todos: () => ["tiposReferencia"] as const,
  obtenerReferencias: () =>
    [...tiposReferenciaKeys.todos(), "obtenerReferencia"] as const,
};
