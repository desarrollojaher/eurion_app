import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import * as SQLite from "expo-sqlite";
import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";

export const dbSqliteService = {
  insertarVerificaciones: async (
    datos: ISincronizarVerificaciones[],
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.insert(schema.verificacionesTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarClientes: async (
    datos: ISincronizarClientes[],
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.insert(schema.clientesTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarConyugue: async (
    datos: ISincronizarConyugue[],
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.insert(schema.clienteConyugueTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarDirecciones: async (
    datos: ISincronizarDirecciones[],
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.insert(schema.direccionTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarZona: async (
    datos: ISincronizarZona[],
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.insert(schema.zonaTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteVerificaciones: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.verificacionesTable);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteClientes: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.clientesTable);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteConyuge: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.clienteConyugueTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteDirecciones: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.direccionTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteZona: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.zonaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  obtenerVerificacionesCabecera: async (
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLite.SQLiteDatabase;
    }
  ) => {
    try {
      await db.delete(schema.zonaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
};
