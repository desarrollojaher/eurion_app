import { IClienteParams } from "@/models/ICliente";

export const clienteKeys = {
  todos: () => ["clientes"] as const,
  clientesCobranza: () => [...clienteKeys.todos(), "clienteCobranza"] as const,
  clienteCobranza: (params: IClienteParams) =>
    [...clienteKeys.clientesCobranza(), params] as const,
  clientesConyugue: () => [...clienteKeys.todos(), "clienteConyugue"] as const,
  clienteConyugue: (params: IClienteParams) =>
    [...clienteKeys.clientesConyugue(), params] as const,
  clientesGarante: () => [...clienteKeys.todos(), "clienteGarante"] as const,
  clienteGarante: (params: IClienteParams) =>
    [...clienteKeys.clientesGarante(), params] as const,
  clientesViviendas: () => [...clienteKeys.todos(), "clienteVivienda"] as const,
  clienteVivienda: (params: IClienteParams) =>
    [...clienteKeys.clientesViviendas(), params] as const,
};
