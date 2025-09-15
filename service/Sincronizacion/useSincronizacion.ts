import { useState } from "react";
import { sincronizacionApi } from "@/api/sincronizacion";
import { dbSqliteService } from "../db/db";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { sincronizacionKeys } from "./sincronizacionKey";
import { forEach } from "lodash";
import { useSession } from "@/helper/provider/Auth";

export const useSincronizacion = () => {
  const [index, setIndex] = useState(1);
  const [tabla, setTabla] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidadDatos, setCantidadDatos] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sincronizado, setSincronizado] = useState(false);

  const queryClient = useQueryClient();

  const { usuario } = useSession();

  const onCloseError = () => {
    setError(false);
  };

  const onCloseSincronizado = () => {
    setSincronizado(false);
  };

  const sincronizar = async () => {
    try {
      setLoading(true);

      setIndex(1);
      setTabla("Verificaciones");
      const datos = await sincronizacionApi.obtenerVerificaciones();

      setCantidadDatos(datos.length);
      if (datos.length > 0) {
        await dbSqliteService.deleteVerificaciones();
        const ver = await dbSqliteService.obtenerVerificaciones();
        const ids = ver.map((item) => item.idCliente).filter((id): id is number => id !== null);

        await dbSqliteService.deleteClientes(ids);
        await dbSqliteService.deleteConyugue(ids);
        await dbSqliteService.deleteVivienda(ids);

        forEach(datos, async (item) => {
          if (item.verificacion) {
            await dbSqliteService.insertarVerificaciones(item.verificacion);
          }
          if (item.cliente) {
            await dbSqliteService.insertarClientes(item.cliente);
          }
          if (item.conyugue) {
            await dbSqliteService.insertarConyugue(item.conyugue);
          }
          if (item.vivienda) {
            await dbSqliteService.insertarVivienda(item.vivienda);
          }
        });
      }

      setIndex(2);
      setTabla("Tipos verificaciones");
      const tipoVerificacion = await sincronizacionApi.obtenerTipoVerificaciones();
      await dbSqliteService.deleteTipoVerificaciones();

      await dbSqliteService.insertarTipoVerificaciones(tipoVerificacion);
      setCantidadDatos(tipoVerificacion.length);

      await dbSqliteService.insertarBitacoraSincronizacion({
        fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        idCobrador: usuario?.usuId ?? -1,
      });

      queryClient.invalidateQueries({ queryKey: sincronizacionKeys.fechas() });

      setLoading(false);
      setSincronizado(true);
    } catch (error: any) {
      console.log(error.message);

      if (error.message === "Network Error") {
        setErrorMessage("No se pudo conectar con el servidor");
      } else {
        setErrorMessage(
          `Hubo un error al descargar los datos en la tabla ${tabla} con el mensaje: ${JSON.stringify(error)} `
        );
      }
      setError(true);
      setLoading(false);
      console.log("Error en la sincronizacion", JSON.stringify(error));
    }
  };

  return {
    index,
    tabla,
    loading,
    sincronizar,
    cantidadDatos,
    error,
    errorMessage,
    onCloseError,
    sincronizado,
    onCloseSincronizado,
  };
};
