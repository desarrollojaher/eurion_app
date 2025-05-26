import { IClienteGaranteCobranza, IClienteParams } from "@/models/ICliente";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clienteKeys } from "./clienteKeys";
import { dbSqliteService } from "../db/db";

export const useClienteGaranteObtener = (
  params: IClienteParams,
  queryOptions?: UseQueryOptions<
    IClienteGaranteCobranza[],
    unknown,
    IClienteGaranteCobranza[],
    ReturnType<(typeof clienteKeys)["clienteGarante"]>
  >
) => {
  const obtenerCliente = async () => {
    return await dbSqliteService.obtenerClienteGarante(params);
  };

  return useQuery({
    queryKey: ["clientes", "clienteGarante", params],
    queryFn: obtenerCliente,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
