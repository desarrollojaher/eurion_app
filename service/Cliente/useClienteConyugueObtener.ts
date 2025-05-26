import { IClienteParams } from "@/models/ICliente";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clienteKeys } from "./clienteKeys";
import { dbSqliteService } from "../db/db";
import { IClienteConyugue } from "@/models/IConyugue";

export const useClienteConyugueObtener = (
  params: IClienteParams,
  queryOptions?: UseQueryOptions<
    IClienteConyugue[],
    unknown,
    IClienteConyugue[],
    ReturnType<(typeof clienteKeys)["clienteConyugue"]>
  >
) => {
  const obtenerClienteConyuge = async () => {
    return await dbSqliteService.obtenerClienteConyugue(params);
  };

  return useQuery({
    queryKey: ["clientes", "clienteConyugue", params],
    queryFn: obtenerClienteConyuge,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
