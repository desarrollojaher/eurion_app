export const tipoVerificacionKeys = {
    todos: () => ["tiposVerificacio"] as const,
  tiposVerificaciones: () =>
    [...tipoVerificacionKeys.todos(), "tiposVerificaciones"] as const,
}