import * as schema from "@/db/schema";
import { ISincronizado } from "@/models/ISincronizado";
import { and, asc, desc, eq, like, notInArray, or, sql } from "drizzle-orm";
import {
  IActualizarVerificacion,
  IVerificacion,
  IVerificacionDetalles,
  IVerificacionDetallesParams,
  IVerificacionesCabecera,
  IVerificacionesCabeceraParams,
  IVerificacionesEliminar,
  IVerificacionesGuardar,
  IVerificacionesVdId,
} from "@/models/IVerificaciones";
import { ICliente } from "@/models/ICliente";
import { IConyugue } from "@/models/IConyugue";
import { IVivienda } from "@/models/IVivienda";
import {
  ISincronizacion,
  ISincronizarVerificacionesEnviar,
} from "@/models/ISincronizar";
import { ITiposVerificaciones } from "@/models/ITiposVerificaciones";
import { SQLiteRunResult } from "expo-sqlite";
import {
  ISubirInformacion,
  ISubirInformacionEliminar,
} from "@/models/ISubirInformacion";
import { db } from "@/helper/db/db";

export const dbSqliteService = {
  eliminarBitacoraSincronizacion: async () => {
    try {
      await db.delete(schema.bitacoraSincronizadoTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  insertarBitacoraSincronizacion: async (datos: ISincronizado) => {
    try {
      await db.insert(schema.bitacoraSincronizadoTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  obtenerVerificaciones: async () => {
    try {
      const verificaciones = await db
        .select({
          idCliente: schema.verificacionTable.idCliente,
        })
        .from(schema.verificacionTable);
      return verificaciones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteVerificaciones: async () => {
    try {
      await db
        .delete(schema.verificacionTable)
        .where(
          notInArray(
            schema.verificacionTable.idVerificacion,
            db
              .select({ vdId: schema.verificacionResultTable.vdId })
              .from(schema.verificacionResultTable)
              .where(eq(schema.verificacionResultTable.vrProcesado, 0)),
          ),
        );

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarVerificaciones: async (datos: IVerificacion) => {
    try {
      await db
        .insert(schema.verificacionTable)
        .values(datos)
        .onConflictDoNothing({
          target: [
            schema.verificacionTable.idVerificacion,
            schema.verificacionTable.idCliente,
            schema.verificacionTable.tipoVerificacion,
            schema.verificacionTable.periodo,
          ],
        });
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteClientes: async (idsParaEliminar: number[]) => {
    try {
      await db
        .delete(schema.clienteTable)
        .where(notInArray(schema.clienteTable.idCliente, idsParaEliminar));
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarClientes: async (datos: ICliente) => {
    try {
      await db
        .insert(schema.clienteTable)
        .values(datos)
        .onConflictDoUpdate({
          target: [schema.clienteTable.idCliente],
          set: { ...datos },
        });

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteConyugue: async (idsParaEliminar: number[]) => {
    try {
      await db
        .delete(schema.conyugueTable)
        .where(notInArray(schema.conyugueTable.idCliente, idsParaEliminar));
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarConyugue: async (datos: IConyugue) => {
    try {
      await db
        .insert(schema.conyugueTable)
        .values(datos)
        .onConflictDoUpdate({
          target: [schema.clienteTable.idCliente],
          set: { ...datos },
        });

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteVivienda: async (idsParaEliminar: number[]) => {
    try {
      await db
        .delete(schema.viviendaTable)
        .where(notInArray(schema.viviendaTable.idCliente, idsParaEliminar));
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarVivienda: async (datos: IVivienda) => {
    try {
      await db
        .insert(schema.viviendaTable)
        .values(datos)
        .onConflictDoUpdate({
          target: [schema.clienteTable.idCliente],
          set: { ...datos },
        });

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  obtenerUltimaSincronizacion: async () => {
    try {
      const sincronizacion: ISincronizacion[] = await db
        .select()
        .from(schema.bitacoraSincronizadoTable)
        .orderBy(desc(schema.bitacoraSincronizadoTable.codigo))
        .limit(1);
      if (sincronizacion.length === 0) return null;
      return sincronizacion[0];
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerVerificacionesCabecera: async (
    params: IVerificacionesCabeceraParams,
  ) => {
    try {
      const filtros = [
        eq(schema.verificacionTable.procesado, 0),
        params.tipoRuta
          ? eq(schema.verificacionTable.tipoVerificacion, params.tipoRuta)
          : undefined,
        params.nombreCliente
          ? or(
              like(
                schema.clienteTable.apellidoCliente,
                `%${params.nombreCliente}%`,
              ),
              like(
                schema.clienteTable.nombreCliente,
                `%${params.nombreCliente}%`,
              ),
            )
          : undefined,
      ].filter(Boolean);

      const datos: IVerificacionesCabecera[] = await db
        .selectDistinct({
          clienteId: schema.clienteTable.idCliente,
          idVerificacion: schema.verificacionTable.idVerificacion,
          codigoTipoDeRuta: schema.verificacionTable.tipoVerificacion,
          fecha: schema.verificacionTable.fechaVerificacion,
          identificacion: schema.clienteTable.identificacionCliente,
          nombres: schema.clienteTable.nombreCliente,
          apellidos: schema.clienteTable.apellidoCliente,
          direccion: schema.clienteTable.direccionCliente,
          direccionTrabajo: schema.clienteTable.direccionTrabajoCliente,
          fotoCliente: schema.clienteTable.fotoCliente,
          fotoDomicilio: schema.clienteTable.fotoDireccion,
          telefono: schema.clienteTable.telefonoEmpresaCliente,
          periodo: schema.verificacionTable.periodo,
          latitud: schema.verificacionTable.latitudCliente,
          longitud: schema.verificacionTable.longitudCliente,
        })
        .from(schema.verificacionTable)
        .innerJoin(
          schema.clienteTable,
          eq(schema.clienteTable.idCliente, schema.verificacionTable.idCliente),
        )
        .where(and(...filtros))
        .orderBy(asc(schema.verificacionTable.fechaVerificacion));

      return datos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },
  obtenerVerificacionesDetalles: async (
    params: IVerificacionDetallesParams,
  ) => {
    try {
      const detallesVerificaciones: IVerificacionDetalles[] = await db
        .select({
          datosGenerales: {
            cedulaCliente: schema.clienteTable.identificacionCliente,
            nombreCliente: schema.clienteTable.nombreCliente,
            apellidoCliente: schema.clienteTable.apellidoCliente,
            estadoCivil: schema.clienteTable.estadoCivilCliente,
            dependientes: schema.clienteTable.dependientesCliente,
            telefono: schema.clienteTable.telefonoCliente,
            observacion: schema.clienteTable.observaciones,
            referencias: schema.clienteTable.referencias,
            detalleAdicional: schema.clienteTable.direccionCliente,
          },
          buro: {
            categoria: schema.clienteTable.cargoCliente,
            score: schema.clienteTable.scoreCliente,
            producto: schema.verificacionTable.producto,
          },
          datosConyugue: {
            cedulaConyuge: schema.conyugueTable.identificacionConyugue,
            nombre: schema.conyugueTable.nombresConyugue,
            apellidos: schema.conyugueTable.apellidosConyugue,
            celular: schema.conyugueTable.telefonoConyugue,
          },
          datosVivienda: {
            direccion: schema.clienteTable.direccionCliente,
            zona: schema.clienteTable.referencias,
            tipoVivienda: schema.viviendaTable.tipoVivienda,
            nombreDueno: schema.viviendaTable.nombreDuenoVivienda,
            telDueno: schema.viviendaTable.telefonoDuenoVivienda,
            construccon: schema.viviendaTable.tipoVivienda,
          },
          actividadEconomica: {
            ocupacionLaboral: schema.clienteTable.ocupacionLaboralCliente,
            empresa: schema.clienteTable.empresaLaboraCliente,
            antiguedad: schema.clienteTable.antiguedadCliente,
            cargo: schema.clienteTable.cargoCliente,
            jefe: schema.clienteTable.nombreJefeCliente,
            ingresos: schema.clienteTable.ingresosCliente,
            telEmpresa: schema.clienteTable.telefonoEmpresaCliente,
            celJefe: schema.clienteTable.celJefeCliente,
            dirEmpresa: schema.clienteTable.direccionTrabajoCliente,
          },
          actividadEconomicaConyugue: {
            ocupacionLaboral: schema.conyugueTable.ocupacionLaboralConyugue,
            empresa: schema.conyugueTable.empresaLaboraConyugue,
            antiguedad: schema.conyugueTable.antiguedadConyugue,
            cargo: schema.conyugueTable.cargoConyugue,
            // jefe: schema.conyugueTable.,
            // ingresos: schema.conyugueTable.,
            telEmpresa: schema.conyugueTable.telefonoEmpresaConyugue,
            celJefe: schema.conyugueTable.celJefeConyugue,
            dirEmpresa: schema.conyugueTable.direccionTrabajoConyugue,
          },
        })
        .from(schema.clienteTable)
        .innerJoin(
          schema.verificacionTable,
          eq(schema.clienteTable.idCliente, schema.verificacionTable.idCliente),
        )
        .leftJoin(
          schema.conyugueTable,
          eq(schema.conyugueTable.idCliente, schema.clienteTable.idCliente),
        )
        .leftJoin(
          schema.viviendaTable,
          eq(schema.viviendaTable.idCliente, schema.clienteTable.idCliente),
        )
        .where(
          eq(schema.clienteTable.identificacionCliente, params.identificacion),
        );

      return detallesVerificaciones[0];
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteTipoVerificaciones: async () => {
    try {
      await db.delete(schema.tiposVerificacionTable);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarTipoVerificaciones: async (datos: ITiposVerificaciones[]) => {
    try {
      await db.insert(schema.tiposVerificacionTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  obtenerTiposVerificacion: async () => {
    try {
      const tipoVerificaicones: ITiposVerificaciones = await db
        .select()
        .from(schema.tiposVerificacionTable);
      return tipoVerificaicones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  actualizarVerificaciones: async (data: IActualizarVerificacion) => {
    try {
      const query = await db
        .update(schema.verificacionTable)
        .set({
          procesado: data.estado,
        })
        .where(eq(schema.verificacionTable.idVerificacion, data.vdId));
      if (query.changes === 0) {
        throw {
          message: "No se ejecuto ninguna actualizacion en verificaciones",
        };
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  guardarGestionesVerificacion: async (data: IVerificacionesGuardar) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await dbSqliteService.actualizarVerificaciones({
        vdId: data.vdId,
        estado: 1,
      });

      const insertVeri = await db
        .insert(schema.verificacionResultTable)
        .values({
          clId: data.clId,
          usIdCobrador: data.usIdCobrador,
          vdId: data.vdId,
          vrComentario: data.veComentario,
          vrFechaVerificacion: data.vrFechaVerificacion,
          vrId: data.vrId,
          vrLatitud: data.vrLatitud,
          vrLongitud: data.vrLongitud,
          vrProcesado: 0,
          vtId: data.vtId,
          pideActualizacion: data.pideActualizacion,
        })
        .returning({ insertedId: schema.verificacionResultTable.vrId });

      let insertImg: SQLiteRunResult = { changes: 0, lastInsertRowId: 0 };
      for (let i = 0; i < data.imagenes.length; i++) {
        data.imagenes[i].vrId = insertVeri[0].insertedId;
        insertImg = await db.insert(schema.verificacionResultDetTable).values({
          fecha: data.imagenes[i].fecha,
          nombre: data.imagenes[i].nombre,
          vcImagenBase: data.imagenes[i].vcImagenBase,
          vcPeriodo: data.imagenes[i].periodo,
          vrdProcesado: 0,
          vrId: data.imagenes[i].vrId,
        });
      }

      if (insertImg.changes === 0 || insertVeri[0].insertedId < 0) {
        // tx.rollback();
        throw { message: "No se pudo guardar la verificacion" };
      }

      await db.run("COMMIT");
      return true;
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerDatosSubirVerificacion: async () => {
    try {
      const verificaciones = await db
        .select({
          id: schema.verificacionResultTable.vdId,
          tipoGestion: schema.verificacionTable.tipoVerificacion,
          fecha: schema.verificacionResultTable.vrFechaVerificacion,
          cliente: sql`(${schema.clienteTable.apellidoCliente} || ' ' || ${schema.clienteTable.nombreCliente})`,
          calificacion: schema.verificacionResultTable.vtId,
          factura: sql`'VERIFICACION'`,
          identificacionCliente: schema.clienteTable.identificacionCliente,
          observacion: schema.verificacionResultTable.vrComentario,
        })
        .from(schema.verificacionResultTable)
        .leftJoin(
          schema.clienteTable,
          eq(
            schema.verificacionResultTable.clId,
            schema.clienteTable.idCliente,
          ),
        )
        .leftJoin(
          schema.verificacionTable,
          eq(
            schema.verificacionResultTable.vdId,
            schema.verificacionTable.idVerificacion,
          ),
        )
        .where(eq(schema.verificacionResultTable.vrProcesado, 0));

      const verificacionesSubir: ISubirInformacion[] = verificaciones;

      return verificacionesSubir;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerInfoSubir: async () => {
    try {
      const verificaciones =
        await dbSqliteService.obtenerDatosSubirVerificacion();

      // const gestionesRealizadas =
      //   await dbSqliteService.obtenerGestionesRealizadas();

      // const gestionesRealizadasUnion: ISubirInformacion[] = union(
      //   verificaciones,
      //   gestionesRealizadas
      // );
      return verificaciones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarVerificaciones: async (datos: IVerificacionesEliminar) => {
    try {
      const res = await db
        .delete(schema.verificacionResultTable)
        .where(eq(schema.verificacionResultTable.vdId, datos.vdId))
        .returning({ deletedId: schema.verificacionResultTable.vrId });

      const deleteImagen = await db
        .delete(schema.verificacionResultDetTable)
        .where(eq(schema.verificacionResultDetTable.vrId, res[0].deletedId));

      if (res[0].deletedId < 0 || deleteImagen.changes === 0) {
        throw { message: "Error al eliminar la verificacion" };
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarInformacionGestionada: async (datos: ISubirInformacionEliminar) => {
    try {
      if (datos.modulo === "verificacion") {
        await db.run("BEGIN TRANSACTION");
        await dbSqliteService.eliminarVerificaciones({
          vdId: Number(datos.id),
        });

        await dbSqliteService.actualizarVerificaciones({
          vdId: Number(datos.id),
          estado: 0,
        });
        await db.run("COMMIT");
      }
      // if (datos.modulo === "gestion") {
      //   await dbSqliteService.eliminarGestionesCelular(datos);
      // }
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerVerificacionesSubidaUnica: async (params: IVerificacionesVdId) => {
    try {
      const datos: ISincronizarVerificacionesEnviar[] = await db
        .select({
          vrId: schema.verificacionResultTable.vrId,
          vrComentario: schema.verificacionResultTable.vrComentario,
          vdId: schema.verificacionResultTable.vdId,
          vtId: schema.verificacionResultTable.vtId,
          clId: schema.verificacionResultTable.clId,
          usIdCobrador: schema.verificacionResultTable.usIdCobrador,
          vrFechaVerificacion:
            schema.verificacionResultTable.vrFechaVerificacion,
          vrLatitud: schema.verificacionResultTable.vrLatitud,
          vrLongitud: schema.verificacionResultTable.vrLongitud,
          fecha: schema.verificacionResultDetTable.fecha,
          vcImagenBase: schema.verificacionResultDetTable.vcImagenBase,
          vcPeriodo: schema.verificacionResultDetTable.vcPeriodo,
          clIdentificacion: schema.clienteTable.identificacionCliente,
          pideActualizacion: schema.verificacionResultTable.pideActualizacion,
        })
        .from(schema.verificacionResultTable)
        .leftJoin(
          schema.verificacionResultDetTable,
          eq(
            schema.verificacionResultTable.vrId,
            schema.verificacionResultDetTable.vrId,
          ),
        )
        .leftJoin(
          schema.clienteTable,
          eq(
            schema.clienteTable.idCliente,
            schema.verificacionResultTable.clId,
          ),
        )
        .where(eq(schema.verificacionResultTable.vdId, params.vdId));
      return datos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  actualizarVerificacionesDetalles: async (data: IActualizarVerificacion) => {
    try {
      await db.run("BEGIN TRANSACTION");
      const query = await db
        .update(schema.verificacionResultTable)
        .set({
          vrProcesado: data.estado,
        })
        .where(eq(schema.verificacionResultTable.vrId, data.vdId));

      const query1 = await db
        .update(schema.verificacionResultDetTable)
        .set({
          vrdProcesado: data.estado,
        })
        .where(eq(schema.verificacionResultDetTable.vrId, data.vdId));
      if (query.changes === 0 && query1.changes === 0) {
        throw {
          message: "No se ejecuto ninguna actualizacion en verificaciones",
        };
      }
      await db.run("COMMIT");
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
};
