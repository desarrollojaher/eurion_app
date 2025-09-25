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

      setIndex(3);
      setTabla("Gestiones");
      const getiones = await sincronizacionApi.sincronizarGestiones();
      setCantidadDatos(getiones.length);
      await dbSqliteService.eliminarGestiones();
      await dbSqliteService.sincronizarGestiones(getiones);

      setIndex(4);
      setTabla("Clientes Gestiones");
      const clientesGestiones = await sincronizacionApi.sincronizarClientesGestiones();
      setCantidadDatos(clientesGestiones.length);
      await dbSqliteService.sincronizarClientesGestiones(clientesGestiones);

      setIndex(5);
      setTabla("Sincronizar Referencias");
      const referencias = await sincronizacionApi.sincronizarReferencias();
      setCantidadDatos(referencias.length);
      await dbSqliteService.eliminarReferencias();
      await dbSqliteService.sincronizarReferecias(referencias);

      setIndex(6);
      setTabla("Sincronizar Documentos");
      const documentos = await sincronizacionApi.sincronizarComprobantes();
      setCantidadDatos(documentos.length);
      await dbSqliteService.eliminarComprobantes();
      await dbSqliteService.sincronizarComprobantes(documentos);

      setIndex(7);
      setTabla("Sincronizar Tipos Gestiones cabecera");
      const tiposGestionesCabecera = await sincronizacionApi.sincronizarTipoGestionesCabecera();
      setCantidadDatos(tiposGestionesCabecera.length);
      await dbSqliteService.eliminarTiposGestionesCabecera();
      await dbSqliteService.sincronizarTiposGestionesCabecera(tiposGestionesCabecera);

      setIndex(8);
      setTabla("Sincronizar Tipos Gestiones detalle");
      const tiposGestionesDetalle = await sincronizacionApi.sincronizarTipoGestionesDetalle();
      setCantidadDatos(tiposGestionesDetalle.length);
      await dbSqliteService.eliminarTiposGestionesDetalle();
      await dbSqliteService.sincronizarTiposGestionesDetalle(tiposGestionesDetalle);

      setIndex(9);
      setTabla("Sincronizar Direcciones");
      const direcciones = await sincronizacionApi.sincronizarDirecciones();
      setCantidadDatos(direcciones.length);
      await dbSqliteService.eliminarDirecciones();
      await dbSqliteService.sincronizarDirecciones(direcciones);

      setIndex(10);
      setTabla("Sincronizar Telefonos");
      const telefonos = await sincronizacionApi.sincronizarTelefonos();
      setCantidadDatos(telefonos.length);
      await dbSqliteService.eliminarTelefonos();
      await dbSqliteService.sincronizarTelefonos(telefonos);

      setIndex(10);
      setTabla("Sincronizar Tipos Referencias");
      const tiposReferencias = await sincronizacionApi.sincronizarTiposReferencias();
      setCantidadDatos(telefonos.length);
      await dbSqliteService.eliminarTiposReferencia();
      await dbSqliteService.sincronizarTiposReferencia(tiposReferencias);

      setIndex(11);
      setTabla("Sincronizar Gestiones Pasadas");
      const gestionesPasadas = await sincronizacionApi.sincronizarGestionesAnteriores();
      setCantidadDatos(gestionesPasadas.length);
      await dbSqliteService.eliminarGestionesPasadas();
      await dbSqliteService.sincronizarGestionesAnteriores(gestionesPasadas);

       setIndex(12);
      setTabla("Sincronizar Formas Pago");
      const formasPago = await sincronizacionApi.sincronizarFormasPago();
      setCantidadDatos(formasPago.length);
      await dbSqliteService.eliminarFormasPago();
      await dbSqliteService.sincronizarFormasPago(formasPago);

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
