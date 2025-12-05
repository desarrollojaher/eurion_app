import * as schema from "@/db/schema";
import { ISincronizado } from "@/models/ISincronizado";
import { and, asc, count, desc, eq, like, notInArray, or, sql, sum } from "drizzle-orm";
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
import { ICliente, IClientesGestion } from "@/models/ICliente";
import { IConyugue } from "@/models/IConyugue";
import { IVivienda } from "@/models/IVivienda";
import { ISincronizacion, ISincronizarVerificacionesEnviar } from "@/models/ISincronizar";
import { ITiposVerificaciones } from "@/models/ITiposVerificaciones";
import { SQLiteRunResult } from "expo-sqlite";
import { ISubirInformacion, ISubirInformacionEliminar } from "@/models/ISubirInformacion";
import { db } from "@/helper/db/db";
import {
  IGestionCabeceraParams,
  IGestiones,
  IGestionesAnteriores,
  IGestionesAnterioresParams,
  IGestionesCabecera,
  IGestionesRealizas,
  IGestionesRealizasEnviar,
} from "@/models/IGestiones";
import { IReferencia, IReferenciaParams } from "@/models/IReferencia";
import {
  IComprobante,
  IComprobanteDetalleParams,
  IComprobanteObtener,
  IComprobanteObtenerParams,
} from "@/models/IComprobante";
import {
  ITipoDatoCabeceraParams,
  ITipoGestion,
  ITipoGestionDetalle,
  ITipoGestionDetalleParams,
} from "@/models/ITiposGestiones";
import { IDireccion, IDireccionParams } from "@/models/IDireccion";
import { ITelefono, ITelefonoParams } from "@/models/ITelefono";
import { ITipoReferencia } from "@/models/ITipoReferencia";
import { IProducto } from "@/models/IProducto";
import { IDocumentosRecibos } from "@/models/IDocumentos";
import { IFormaPago } from "@/models/IFormaPago";
import { IRecibos, IRecibosObtener } from "@/models/IRecibo";
import { union } from "lodash";
import { sqliteView } from "drizzle-orm/sqlite-core";

export const dbSqliteService = {
  eliminarBitacoraSincronizacion: async () => {
    try {
      await db.delete(schema.bitacoraSincronizadoTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarTodosLosDatos: async () => {
    try {
      await db.delete(schema.bitacoraSincronizadoTable);
      await db.delete(schema.clienteTable);
      await db.delete(schema.conyugueTable);
      await db.delete(schema.direccionesTable);
      await db.delete(schema.documentosDetTable);
      await db.delete(schema.documentosTable);
      await db.delete(schema.formasPagoTable);
      await db.delete(schema.gestionesAnterioresTable);
      await db.delete(schema.gestionesCobranzasResultados);
      await db.delete(schema.gestionesDetallesTable);
      await db.delete(schema.gestionesTable);
      await db.delete(schema.pagosGestion);
      await db.delete(schema.referenciasTable);
      await db.delete(schema.telefonosTable);
      await db.delete(schema.tiposGestionesCabeceraTable);
      await db.delete(schema.tiposGestionesDetallesTable);
      await db.delete(schema.tiposReferenciaTable);
      await db.delete(schema.tiposVerificacionTable);
      await db.delete(schema.verificacionResultDetTable);
      await db.delete(schema.verificacionTable);
      await db.delete(schema.viviendaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  insertarBitacoraSincronizacion: async (datos: ISincronizado) => {
    try {
      await db.insert(schema.bitacoraSincronizadoTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
              .where(eq(schema.verificacionResultTable.vrProcesado, 0))
          )
        );

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerVerificacionesCabecera: async (params: IVerificacionesCabeceraParams) => {
    try {
      const filtros = [
        eq(schema.verificacionTable.procesado, 0),
        params.tipoRuta
          ? eq(schema.verificacionTable.tipoVerificacion, params.tipoRuta)
          : undefined,
        params.nombreCliente
          ? or(
              like(schema.clienteTable.apellidoCliente, `%${params.nombreCliente}%`),
              like(schema.clienteTable.nombreCliente, `%${params.nombreCliente}%`)
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
          eq(schema.clienteTable.idCliente, schema.verificacionTable.idCliente)
        )
        .where(and(...filtros))
        .orderBy(asc(schema.verificacionTable.fechaVerificacion));

      return datos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },
  obtenerVerificacionesDetalles: async (params: IVerificacionDetallesParams) => {
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
          eq(schema.clienteTable.idCliente, schema.verificacionTable.idCliente)
        )
        .leftJoin(
          schema.conyugueTable,
          eq(schema.conyugueTable.idCliente, schema.clienteTable.idCliente)
        )
        .leftJoin(
          schema.viviendaTable,
          eq(schema.viviendaTable.idCliente, schema.clienteTable.idCliente)
        )
        .where(eq(schema.clienteTable.identificacionCliente, params.identificacion));

      return detallesVerificaciones[0];
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarTipoVerificaciones: async (datos: ITiposVerificaciones[]) => {
    try {
      if (datos.length > 0) {
        await db.insert(schema.tiposVerificacionTable).values(datos);
      }
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  obtenerTiposVerificacion: async () => {
    try {
      const tipoVerificaicones: ITiposVerificaciones[] = await db
        .select()
        .from(schema.tiposVerificacionTable);
      return tipoVerificaicones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
          vrId: data.vrId !== null ? data.vrId : undefined,
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
          calificacion: schema.tiposVerificacionTable.vtDescripcion,
          factura: sql`'VERIFICACION'`,
          identificacionCliente: schema.clienteTable.identificacionCliente,
          observacion: schema.verificacionResultTable.vrComentario,
        })
        .from(schema.verificacionResultTable)
        .leftJoin(
          schema.clienteTable,
          eq(schema.verificacionResultTable.clId, schema.clienteTable.idCliente)
        )
        .leftJoin(
          schema.verificacionTable,
          eq(schema.verificacionResultTable.vdId, schema.verificacionTable.idVerificacion)
        )
        .leftJoin(
          schema.tiposVerificacionTable,
          eq(schema.verificacionResultTable.vtId, schema.tiposVerificacionTable.vtId)
        )
        .where(eq(schema.verificacionResultTable.vrProcesado, 0));

      const verificacionesSubir: ISubirInformacion[] = verificaciones;

      return verificacionesSubir;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerInfoSubir: async () => {
    try {
      const verificaciones = await dbSqliteService.obtenerDatosSubirVerificacion();

      const gestionesRealizadas = await dbSqliteService.obtenerGestiones();

      const gestionesRealizadasUnion: ISubirInformacion[] = union(
        verificaciones,
        gestionesRealizadas
      );
      return gestionesRealizadasUnion;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      if (datos.modulo === "gestion") {
        await db.run("BEGIN TRANSACTION");
        await dbSqliteService.eliminarGestionRealizada(Number(datos.id));
        const cliente = await db
          .select()
          .from(schema.clienteTable)
          .where(eq(schema.clienteTable.identificacionCliente, datos.identificacionCliente))
          .limit(1)
          .get();

        if (!cliente) {
          throw { message: "No se encontro el cliente" };
        }

        await db
          .update(schema.gestionesTable)
          .set({ gestionado: 0 })
          .where(eq(schema.gestionesTable.clId, Number(cliente.idCliente)));

        await db.run("COMMIT");
      }
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
          vrFechaVerificacion: schema.verificacionResultTable.vrFechaVerificacion,
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
          eq(schema.verificacionResultTable.vrId, schema.verificacionResultDetTable.vrId)
        )
        .leftJoin(
          schema.clienteTable,
          eq(schema.clienteTable.idCliente, schema.verificacionResultTable.clId)
        )
        .where(eq(schema.verificacionResultTable.vdId, params.vdId));
      return datos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
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
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarGestiones: async (data: IGestiones[]) => {
    try {
      if (data.length > 0) {
        await db
          .insert(schema.gestionesTable)
          .values(data)
          .onConflictDoNothing({
            target: [schema.gestionesTable.idHojaRuta, schema.gestionesTable.clId],
          });
        for (let i = 0; i < data.length; i++) {
          await db.insert(schema.gestionesDetallesTable).values(data[i].gestiones);
        }
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  eliminarGestiones: async () => {
    try {
      await db.delete(schema.gestionesTable).where(eq(schema.gestionesTable.gestionado, 0));
      await db.delete(schema.gestionesDetallesTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  sincronizarClientesGestiones: async (data: IClientesGestion[]) => {
    try {
      for (let i = 0; i < data.length; i++) {
        await db
          .insert(schema.clienteTable)
          .values(data[i].cliente)
          .onConflictDoUpdate({
            target: [schema.clienteTable.idCliente],
            set: { ...data[i].cliente },
          });
        await db
          .insert(schema.viviendaTable)
          .values(data[i].vivienda)
          .onConflictDoUpdate({
            target: [schema.viviendaTable.idCliente],
            set: { ...data[i].vivienda },
          });
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarReferecias: async (data: IReferencia[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.referenciasTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarReferencias: async () => {
    try {
      await db.delete(schema.referenciasTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarComprobantes: async (data: IComprobante[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.documentosTable).values(data);
      }
      for (let i = 0; i < data.length; i++) {
        await db.insert(schema.documentosDetTable).values(data[i].productos);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarComprobantes: async () => {
    try {
      await db.delete(schema.documentosTable);
      await db.delete(schema.documentosDetTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarGestionesAnteriores: async (data: IGestionesAnteriores[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.gestionesAnterioresTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarGestionesAnteriores: async () => {
    try {
      await db.delete(schema.gestionesAnterioresTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarTiposGestionesCabecera: async (data: ITipoGestion[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.tiposGestionesCabeceraTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarTiposGestionesCabecera: async () => {
    try {
      await db.delete(schema.tiposGestionesCabeceraTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarTiposGestionesDetalle: async (data: ITipoGestionDetalle[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.tiposGestionesDetallesTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarTiposGestionesDetalle: async () => {
    try {
      await db.delete(schema.tiposGestionesDetallesTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarDirecciones: async (data: IDireccion[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.direccionesTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarDirecciones: async () => {
    try {
      await db.delete(schema.direccionesTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarTelefonos: async (data: ITelefono[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.telefonosTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarTelefonos: async () => {
    try {
      await db.delete(schema.telefonosTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarTiposReferencia: async (data: ITipoReferencia[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.tiposReferenciaTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarTiposReferencia: async () => {
    try {
      await db.delete(schema.tiposReferenciaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarGestionesPasadas: async () => {
    try {
      await db.delete(schema.gestionesAnterioresTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  sincronizarFormasPago: async (data: IFormaPago[]) => {
    try {
      if (data.length > 0) {
        await db.insert(schema.formasPagoTable).values(data);
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarFormasPago: async () => {
    try {
      await db.delete(schema.formasPagoTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerGestionesCabecera: async (params: IGestionCabeceraParams) => {
    try {
      //   const userView = sqliteView("user_view").as((db) =>
      //     db
      //       .select({
      //         clId: schema.documentosTable.clId,
      //         deudaTotal: sum(schema.documentosTable.valorTotalCredito),
      //         deudaPendiente: sql`
      //   SUM(COALESCE(${schema.documentosTable.crSaldoCredito}, 0)) +
      //   SUM(COALESCE(${schema.documentosTable.interesGastoCobranza}, 0)) +
      //   SUM(COALESCE(${schema.documentosTable.interesGastoMora}, 0))
      // `,
      //       })
      //       .from(schema.documentosTable)
      //       .innerJoin(
      //         schema.gestionesTable,
      //         and(
      //           eq(schema.documentosTable.clId, schema.gestionesTable.clId),
      //           eq(schema.gestionesTable.gestionado, 0)
      //         )
      //       )
      //       .innerJoin(
      //         schema.gestionesDetallesTable,
      //         eq(schema.documentosTable.idCredito, schema.gestionesDetallesTable.crId)
      //       )
      //       .groupBy(schema.documentosTable.clId)
      //   );

      //   const d = await db.select().from(userView);

      //   console.log(d);

      const gestiones: IGestionesCabecera[] = await db
        .select({
          nombreCliente: schema.clienteTable.nombreCliente,
          apellidoCliente: schema.clienteTable.apellidoCliente,
          identificacion: schema.clienteTable.identificacionCliente,
          direccionCliente: schema.direccionesTable.diDireccion,
          deudaTotal: sum(schema.documentosTable.valorTotalCredito),
          deudaPendiente: sql`
      SUM(COALESCE(${schema.documentosTable.crSaldoCredito}, 0)) +
      SUM(COALESCE(${schema.documentosTable.interesGastoCobranza}, 0)) +
      SUM(COALESCE(${schema.documentosTable.interesGastoMora}, 0))
    `,
          latitudCliente: schema.direccionesTable.diLatitud,
          longitudCliente: schema.direccionesTable.diLongitud,
          cliId: schema.clienteTable.idCliente,
          idHojaRuta: schema.gestionesTable.idHojaRuta,
          peId: schema.clienteTable.personaId,
          imagenCliente: schema.clienteTable.fotoCliente,
          imagenDomicilio: schema.clienteTable.fotoDireccion,
          tcId: schema.gestionesTable.tcId,
          total: count(schema.clienteTable.personaId),
        })
        .from(schema.gestionesTable)
        .leftJoin(
          schema.clienteTable,
          eq(schema.clienteTable.idCliente, schema.gestionesTable.clId)
        )
        .leftJoin(
          schema.direccionesTable,
          and(
            eq(schema.direccionesTable.peId, schema.clienteTable.personaId),
            eq(schema.direccionesTable.diCobranza, "S")
          )
        )
        .leftJoin(
          schema.documentosTable,
          eq(schema.documentosTable.clId, schema.gestionesTable.clId)
        )
        .innerJoin(
          schema.gestionesDetallesTable,
          eq(schema.documentosTable.idCredito, schema.gestionesDetallesTable.crId)
        )
        .where(
          and(
            eq(schema.gestionesTable.gestionado, 0),
            or(
              like(schema.clienteTable.apellidoCliente, `%${params.buscador}%`),
              like(schema.clienteTable.nombreCliente, `%${params.buscador}%`)
            )
          )
        )
        .groupBy(schema.clienteTable.idCliente);

      return gestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerTiposGestionesCabecera: async (params: ITipoDatoCabeceraParams) => {
    try {
      const tiposGestiones: ITipoGestion[] = await db
        .select({
          gcId: schema.tiposGestionesCabeceraTable.gcId,
          gcDescripcion: schema.tiposGestionesCabeceraTable.gcDescripcion,
          teId: schema.tiposGestionesCabeceraTable.teId,
        })
        .from(schema.tiposGestionesCabeceraTable)
        .where(eq(schema.tiposGestionesCabeceraTable.teId, params.tcId));
      return tiposGestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerTiposGestionesDetalles: async (params: ITipoGestionDetalleParams) => {
    try {
      const tiposGestiones: ITipoGestionDetalle[] = await db
        .select({
          gcId: schema.tiposGestionesDetallesTable.gcId,
          gdId: schema.tiposGestionesDetallesTable.gdId,
          gdDescripcion: schema.tiposGestionesDetallesTable.gdDescripcion,
          gfCompromisoPago: schema.tiposGestionesDetallesTable.gfCompromisoPago,
        })
        .from(schema.tiposGestionesDetallesTable)
        .where(eq(schema.tiposGestionesDetallesTable.gcId, params.gcId));
      return tiposGestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerTiposReferencia: async () => {
    try {
      const tiposReferencia: ITipoReferencia[] = await db
        .select({
          trId: schema.tiposReferenciaTable.trId,
          trReferencia: schema.tiposReferenciaTable.trReferencia,
        })
        .from(schema.tiposReferenciaTable);
      return tiposReferencia;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerFacturas: async (params: IComprobanteObtenerParams) => {
    try {
      const facturas: IComprobanteObtener[] = await db
        .select({
          idFactura: schema.documentosTable.idFactura,
          fechaFactura: schema.documentosTable.fechaFactura,
          tipoComprobante: schema.documentosTable.tipoComprobante,
          idCredito: schema.documentosTable.idCredito,
          nroCuotas: schema.documentosTable.nroCuotas,
          valorCuota: schema.documentosTable.valorCuota,
          valorTotalCredito: schema.documentosTable.valorTotalCredito,
          crSaldoCapital: schema.documentosTable.crSaldoCapital,
          crSaldoInteres: schema.documentosTable.crSaldoInteres,
          crSaldoCredito: schema.documentosTable.crSaldoCredito,
          interesGastoMora: schema.documentosTable.interesGastoMora,
          interesGastoCobranza: schema.documentosTable.interesGastoCobranza,
          cuotasPagadas: schema.documentosTable.cuotasPagadas,
          cuotasPorPagar: schema.documentosTable.cuotasPorPagar,
          clId: schema.documentosTable.clId,
          caId: schema.gestionesDetallesTable.caId,
          gcId: schema.gestionesDetallesTable.gcId,
          idHojaDetalle: schema.gestionesDetallesTable.idHojaDetalle,
          idAgencia: schema.gestionesDetallesTable.idAgencia,
        })
        .from(schema.documentosTable)
        .innerJoin(
          schema.gestionesDetallesTable,
          eq(schema.documentosTable.idCredito, schema.gestionesDetallesTable.crId)
        )
        .where(eq(schema.documentosTable.clId, params.clId));
      return facturas;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  guardarGestiones: async (data: IGestionesRealizas) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db.insert(schema.gestionesCobranzasResultados).values(data);
      await db
        .update(schema.gestionesTable)
        .set({ gestionado: 1 })
        .where(eq(schema.gestionesTable.clId, data.clId ?? -1));
      await db.run("COMMIT");
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerGestionesPasadas: async (params: IGestionesAnterioresParams) => {
    try {
      const gestiones: IGestionesAnteriores[] = await db
        .select({
          gcId: schema.gestionesAnterioresTable.gcId,
          idCliente: schema.gestionesAnterioresTable.idCliente,
          nombreCliente: schema.gestionesAnterioresTable.nombreCliente,
          codComprobanteStock: schema.gestionesAnterioresTable.codComprobanteStock,
          idCredito: schema.gestionesAnterioresTable.idCredito,
          idFactura: schema.gestionesAnterioresTable.idFactura,
          nombreGestiona: schema.gestionesAnterioresTable.nombreGestiona,
          fechaGestionado: schema.gestionesAnterioresTable.fechaGestionado,
          fechaProxGestion: schema.gestionesAnterioresTable.fechaProxGestion,
          geObservacion: schema.gestionesAnterioresTable.geObservacion,
          estadoGestion: schema.gestionesAnterioresTable.estadoGestion,
        })
        .from(schema.gestionesAnterioresTable)
        .where(eq(schema.gestionesAnterioresTable.idCliente, params.clId));
      return gestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerReferencias: async (params: IReferenciaParams) => {
    try {
      const referencias: IReferencia[] = await db
        .select()
        .from(schema.referenciasTable)
        .where(eq(schema.referenciasTable.clId, params.clId));
      return referencias;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerProductos: async (params: IComprobanteDetalleParams) => {
    try {
      const productos: IProducto[] = await db
        .select()
        .from(schema.documentosDetTable)
        .where(eq(schema.documentosDetTable.crId, params.crId));
      return productos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerDocumentoRecibos: async (params: IGestionCabeceraParams) => {
    try {
      const recibos: IDocumentosRecibos[] = await db
        .select({
          nombreCliente: schema.clienteTable.nombreCliente,
          apellidoCliente: schema.clienteTable.apellidoCliente,
          identificacion: schema.clienteTable.identificacionCliente,
          deudaTotal: sql`SUM(COALESCE(${schema.documentosTable.valorTotalCredito}, 0))`,
          deudaPendiente: sql`
          SUM(COALESCE(${schema.documentosTable.crSaldoCredito}, 0)) +         
          SUM(COALESCE(${schema.documentosTable.interesGastoCobranza}, 0)) +
          SUM(COALESCE(${schema.documentosTable.interesGastoMora}, 0))
          `,
          cliId: schema.clienteTable.idCliente,
        })
        .from(schema.gestionesTable)
        .leftJoin(
          schema.clienteTable,
          eq(schema.clienteTable.idCliente, schema.gestionesTable.clId)
        )
        .leftJoin(
          schema.documentosTable,
          eq(schema.documentosTable.clId, schema.clienteTable.idCliente)
        )
        .innerJoin(
          schema.gestionesDetallesTable,
          eq(schema.documentosTable.idCredito, schema.gestionesDetallesTable.crId)
        )
        .where(
          and(
            or(
              like(schema.clienteTable.apellidoCliente, `%${params.buscador}%`),
              like(schema.clienteTable.nombreCliente, `%${params.buscador}%`)
            )
          )
        )
        .groupBy(schema.clienteTable.idCliente);

      return recibos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerFormasPago: async () => {
    try {
      const formasPago: IFormaPago[] = await db.select().from(schema.formasPagoTable);
      return formasPago;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  insertarRecibos: async (data: IRecibos[]) => {
    try {
      await db.insert(schema.pagosGestion).values(data);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerRecibos: async () => {
    try {
      const recibos: IRecibosObtener[] = await db
        .select({
          coId: schema.pagosGestion.coId,
          crId: schema.pagosGestion.crId,
          pgValorCobrado: schema.pagosGestion.pgValorCobrado,
          usIdCobrador: schema.pagosGestion.usIdCobrador,
          fpId: schema.pagosGestion.fpId,
          pgFechaCobro: schema.pagosGestion.pgFechaCobro,
          pgObservaciones: schema.pagosGestion.pgObservaciones,
          pgSincronizado: schema.pagosGestion.pgSincronizado,
          pgLatitud: schema.pagosGestion.pgLatitud,
          pgLongitud: schema.pagosGestion.pgLongitud,
          gcId: schema.pagosGestion.gcId,
          urlImg: schema.pagosGestion.urlImg,
          nombreImg: schema.pagosGestion.nombreImg,
          clId: schema.documentosTable.clId,
          doctran: sql`${schema.documentosTable.tipoComprobante} || ' ' || ${schema.documentosTable.idCredito}`,
          tipoPago: schema.formasPagoTable.fpNombre,
          identificacionCliente: schema.clienteTable.identificacionCliente,
          caId: schema.pagosGestion.caId,
          hdId: schema.pagosGestion.hdId,
        })
        .from(schema.pagosGestion)
        .leftJoin(
          schema.documentosTable,
          eq(schema.documentosTable.idCredito, schema.pagosGestion.crId)
        )
        .leftJoin(
          schema.clienteTable,
          eq(schema.clienteTable.idCliente, schema.documentosTable.clId)
        )
        .leftJoin(schema.formasPagoTable, eq(schema.formasPagoTable.fpId, schema.pagosGestion.fpId))
        .where(eq(schema.pagosGestion.pgSincronizado, "N"));

      return recibos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerGestiones: async () => {
    try {
      const gestiones: ISubirInformacion[] = await db
        .select({
          id: schema.gestionesCobranzasResultados.id,
          tipoGestion: sql`'Gestion'`,
          fecha: schema.gestionesCobranzasResultados.crFechaGestionada,
          cliente: sql`(${schema.clienteTable.apellidoCliente} || ' ' || ${schema.clienteTable.nombreCliente})`,
          calificacion: schema.tiposGestionesDetallesTable.gdDescripcion,
          factura: sql`${schema.documentosTable.tipoComprobante} || ' ' || ${schema.documentosTable.idCredito}`,
          identificacionCliente: schema.clienteTable.identificacionCliente,
          observacion: sql`${schema.gestionesCobranzasResultados.crObservaciones} || ' ' || ${schema.gestionesCobranzasResultados.cpObservaciones}`,
        })
        .from(schema.gestionesCobranzasResultados)
        .leftJoin(
          schema.clienteTable,
          eq(schema.gestionesCobranzasResultados.clId, schema.clienteTable.idCliente)
        )
        .leftJoin(
          schema.documentosTable,
          eq(schema.gestionesCobranzasResultados.crIdCredito, schema.documentosTable.idCredito)
        )
        .leftJoin(
          schema.tiposGestionesDetallesTable,
          eq(schema.gestionesCobranzasResultados.gcId, schema.tiposGestionesDetallesTable.gcId)
        )
        .where(eq(schema.gestionesCobranzasResultados.crEstadoSync, "PENDIENTE"));
      return gestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerGestionesRealizadas: async (id: number) => {
    try {
      const gestiones: IGestionesRealizasEnviar[] = await db
        .select({
          gcIdCc: schema.gestionesCobranzasResultados.gcIdCc,
          gdId: schema.gestionesCobranzasResultados.gdId,
          crLatitud: schema.gestionesCobranzasResultados.crLatitud,
          crLongitud: schema.gestionesCobranzasResultados.crLongitud,
          crObservaciones: schema.gestionesCobranzasResultados.crObservaciones,
          usIdGestiona: schema.gestionesCobranzasResultados.usIdGestiona,
          caId: schema.gestionesCobranzasResultados.caId,
          clId: schema.gestionesCobranzasResultados.clId,
          agId: schema.gestionesCobranzasResultados.agId,
          crIdCredito: schema.gestionesCobranzasResultados.crIdCredito,
          cpFechaCompromiso: schema.gestionesCobranzasResultados.cpFechaCompromiso,
          hrId: schema.gestionesCobranzasResultados.hrId,
          cpObservaciones: schema.gestionesCobranzasResultados.cpObservaciones,
          gcId: schema.gestionesCobranzasResultados.gcId,
          crFechaProxGestion: schema.gestionesCobranzasResultados.crFechaProxGestion,
          trId: schema.gestionesCobranzasResultados.trId,
          crFechaGestionada: schema.gestionesCobranzasResultados.crFechaGestionada,
          diId: schema.gestionesCobranzasResultados.diId,
          teId: schema.gestionesCobranzasResultados.teId,
        })
        .from(schema.gestionesCobranzasResultados)
        .where(eq(schema.gestionesCobranzasResultados.id, id));
      return gestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  actualizarGestion: async (id: number) => {
    try {
      await db
        .update(schema.gestionesCobranzasResultados)
        .set({ crEstadoSync: "ENVIADO" })
        .where(eq(schema.gestionesCobranzasResultados.id, id));
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarGestionRealizada: async (id: number) => {
    try {
      await db
        .delete(schema.gestionesCobranzasResultados)
        .where(eq(schema.gestionesCobranzasResultados.id, id));
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarRecibos: async (id: IRecibosObtener) => {
    try {
      await db
        .delete(schema.pagosGestion)
        .where(
          and(
            eq(schema.pagosGestion.gcId, id.gcId ?? -1),
            eq(schema.pagosGestion.fpId, id.fpId ?? -1),
            eq(schema.pagosGestion.coId, id.coId ?? -1),
            eq(schema.pagosGestion.crId, id.crId ?? -1),
            eq(schema.pagosGestion.usIdCobrador, id.usIdCobrador ?? -1),
            eq(schema.pagosGestion.pgValorCobrado, id.pgValorCobrado ?? -1),
            eq(schema.pagosGestion.pgFechaCobro, id.pgFechaCobro ?? "")
          )
        );
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  actualizarRecibos: async (id: IRecibosObtener) => {
    try {
      await db
        .update(schema.pagosGestion)
        .set({ pgSincronizado: "ENVIADO" })
        .where(
          and(
            eq(schema.pagosGestion.gcId, id.gcId ?? -1),
            eq(schema.pagosGestion.fpId, id.fpId ?? -1)
          )
        );
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerTelefonos: async (params: ITelefonoParams) => {
    try {
      const telefonos: ITelefono[] = await db
        .select()
        .from(schema.telefonosTable)
        .where(eq(schema.telefonosTable.peId, params.peId));
      return telefonos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerDirecciones: async (params: IDireccionParams) => {
    try {
      const direcciones: IDireccion[] = await db
        .select()
        .from(schema.direccionesTable)
        .where(eq(schema.direccionesTable.peId, params.peId));
      return direcciones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido = mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
};
