export const formasPagoKeys = {
  todos: () => ["formasPago"] as const,
  obtenerFormasPago: () => [...formasPagoKeys.todos(), "obtenerFormaPago"] as const,
};
