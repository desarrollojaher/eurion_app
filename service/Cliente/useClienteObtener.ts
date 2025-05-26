import { ICliente, IClienteParams } from "@/models/ICliente";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clienteKeys } from "./clienteKeys";
import { dbSqliteService } from "../db/db";

export const useClienteObtener = (
  params: IClienteParams,
  queryOptions?: UseQueryOptions<
    ICliente[],
    unknown,
    ICliente[],
    ReturnType<(typeof clienteKeys)["clienteCobranza"]>
  >
) => {
  const obtenerCliente = async () => {
    return await dbSqliteService.obtenerClienteCobranza(params);
  };

  return useQuery({
    queryKey: ["clientes", "clienteCobranza", params],
    queryFn: obtenerCliente,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
