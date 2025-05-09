import { useState } from "react";
import { dbSqliteService } from "../db/db";
import { sincronizacionApi } from "@/api/sincronizacion";

export const useSincronizacion = () => {
  const [index, setIndex] = useState(1);
  const [tabla, setTabla] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidadDatos, setCantidadDatos] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sincronizado, setSincronizado] = useState(false);

  const onCloseError = () => {
    setError(false);
  };

  const onCloseSincronizado = () => {
    setSincronizado(false);
  };

  const sincronizar = async () => {
    try {
      setLoading(true);
      // sincroniza las verificaciones
      setIndex(1);
      setTabla("Verificaciones");
      const datos = await sincronizacionApi.verificaciones();
      setCantidadDatos(datos.length);
      await dbSqliteService.deleteVerificaciones();
      await dbSqliteService.insertarVerificaciones(datos);

      // sincroniza clientes
      setIndex(2);
      setTabla("Clientes");
      const clientes = await sincronizacionApi.clientes();
      setCantidadDatos(clientes.length);
      await dbSqliteService.deleteClientes();
      await dbSqliteService.insertarClientes(clientes);

      // sincronizar conyugue
      setIndex(3);
      setTabla("ClienteConyugue");
      const conyugue = await sincronizacionApi.conyugue();
      setCantidadDatos(conyugue.length);
      await dbSqliteService.deleteConyuge();
      await dbSqliteService.insertarConyugue(conyugue);

      // sincronizar direcciones

      setIndex(4);
      setTabla("Direcciones");
      const direcciones = await sincronizacionApi.direcciones();
      setCantidadDatos(direcciones.length);
      await dbSqliteService.deleteDirecciones();
      await dbSqliteService.insertarDirecciones(direcciones);

      // sincronizar zona
      setIndex(5);
      setTabla("Zona");
      const zona = await sincronizacionApi.zona();
      setCantidadDatos(zona.length);
      await dbSqliteService.deleteZona();
      await dbSqliteService.insertarZona(zona);
      setLoading(false);
      setSincronizado(true);
    } catch (error: any) {
      if (error.message === "Network Error") {
        setErrorMessage("No se pudo conectar con el servidor");
      } else {
        setErrorMessage(JSON.stringify(error));
      }
      setError(true);
      setLoading(false);
      console.log("Error en la sincoizacion", error);
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
