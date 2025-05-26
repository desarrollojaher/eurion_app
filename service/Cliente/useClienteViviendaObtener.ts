import { ICliente, IClienteParams } from "@/models/ICliente";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { clienteKeys } from "./clienteKeys";
import { dbSqliteService } from "../db/db";
import { IDireccionGcobranza } from "@/models/IDireccion";

export const useClienteViviendaObtener = (
  params: IClienteParams,
  queryOptions?: UseQueryOptions<
    IDireccionGcobranza[],
    unknown,
    IDireccionGcobranza[],
    ReturnType<(typeof clienteKeys)["clienteVivienda"]>
  >
) => {
  const obtenerClienteVivienda = async () => {
    return await dbSqliteService.obtenerDirecconViviendaGcobranza(params);
  };

  return useQuery({
    queryKey: ["clientes", "clienteVivienda", params],
    queryFn: obtenerClienteVivienda,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
