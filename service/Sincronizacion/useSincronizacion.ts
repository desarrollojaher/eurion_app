import { useState } from "react";
import { dbSqliteService } from "../db/db";
import { sincronizacionApi } from "@/api/sincronizacion";
import { SQLiteDatabase } from "expo-sqlite";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";

export const useSincronizacion = (
  db: ExpoSQLiteDatabase<typeof schema> & {
    $client: SQLiteDatabase;
  }
) => {
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
      await dbSqliteService.deleteVerificaciones(db);
      const datos = await sincronizacionApi.verificaciones();
      setCantidadDatos(datos.length);
      await dbSqliteService.insertarVerificaciones(datos, db);

      // sincroniza clientes
      setIndex(2);
      setTabla("Clientes");
      await dbSqliteService.deleteClientes(db);
      const clientes = await sincronizacionApi.clientes();
      setCantidadDatos(clientes.length);
      await dbSqliteService.insertarClientes(clientes, db);

      // sincronizar conyugue
      setIndex(3);
      setTabla("ClienteConyugue");
      await dbSqliteService.deleteConyuge(db);
      const conyugue = await sincronizacionApi.conyugue();
      setCantidadDatos(conyugue.length);
      await dbSqliteService.insertarConyugue(conyugue, db);

      // sincronizar direcciones

      setIndex(4);
      setTabla("Direcciones");
      await dbSqliteService.deleteDirecciones(db);
      const direcciones = await sincronizacionApi.direcciones();
      setCantidadDatos(direcciones.length);
      await dbSqliteService.insertarDirecciones(direcciones, db);

      // sincronizar zona
      setIndex(5);
      setTabla("Zona");
      await dbSqliteService.deleteZona(db);
      const zona = await sincronizacionApi.zona();
      setCantidadDatos(zona.length);
      await dbSqliteService.insertarZona(zona, db);
      setLoading(false);
      setSincronizado(true);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
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
