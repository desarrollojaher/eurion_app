import * as schema from "@/db/schema";
import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";
import { and, asc, count, eq, gt, gte, like, ne, sql, sum } from "drizzle-orm";
import {
  IActualizarVerificacion,
  IVerificacionDetalles,
  IVerificacionDetallesParams,
  IVerificacionesCabecera,
  IVerificacionesCabeceraParams,
  IVerificacionesEliminar,
  IVerificacionesGuardar,
} from "@/models/IVerificaciones";
import { db } from "@/app/_layout";
import {
  ISubirInformacion,
  ISubirInformacionEliminar,
} from "@/models/ISubirInformacion";
import { IImagenCliente, IImagenDomicilio } from "@/models/IImagenes";
import { groupBy, mapValues, sumBy, unionBy } from "lodash";
import { IDocumentos } from "@/models/IDocumentos";
import { IEnviarGcobranza } from "@/models/IEnviarGcobranza";
import { format } from "date-fns";
import { IGestiones } from "@/models/IGestiones";

export const dbSqliteService = {
  insertarVerificaciones: async (datos: ISincronizarVerificaciones[]) => {
    try {
      await db
        .insert(schema.verificacionesTable)
        .values(datos)
        .onConflictDoNothing({
          target: [
            schema.verificacionesTable.identificacionCliente,
            schema.verificacionesTable.codigoTipoRuta,
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
  insertarClientes: async (datos: ISincronizarClientes[]) => {
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
  insertarConyugue: async (datos: ISincronizarConyugue[]) => {
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
  insertarDirecciones: async (datos: ISincronizarDirecciones[]) => {
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
  insertarZona: async (datos: ISincronizarZona[]) => {
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
  insertarDocumentos: async (datos: IDocumentos[]) => {
    try {
      await db.insert(schema.documentosGcobranzaTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarGCobranza: async (datos: IEnviarGcobranza[]) => {
    try {
      await db.insert(schema.enviarGcobranzaCelularTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  insertarImagenCliente: async (datos: IImagenCliente[]) => {
    try {
      await db
        .insert(schema.fotoClienteTable)
        .values(datos)
        .onConflictDoNothing({
          target: [schema.fotoClienteTable.identificacionCliente],
        });

      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarImagenDomicilio: async (datos: IImagenDomicilio[]) => {
    try {
      await db
        .insert(schema.fotoDomicilioTable)
        .values(datos)
        .onConflictDoNothing({
          target: [schema.fotoDomicilioTable.identificacionCliente],
        });

      return true;
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
        .delete(schema.verificacionesTable)
        .where(eq(schema.verificacionesTable.esVerificado, 0));
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteClientes: async () => {
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
  deleteConyuge: async () => {
    try {
      await db.delete(schema.clienteConyugueTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteDirecciones: async () => {
    try {
      await db.delete(schema.direccionTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteZona: async () => {
    try {
      await db.delete(schema.zonaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteDocumentos: async () => {
    try {
      await db.delete(schema.documentosGcobranzaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteGcobranza: async () => {
    try {
      await db.delete(schema.enviarGcobranzaCelularTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteImagenesClientes: async () => {
    try {
      await db.delete(schema.fotoClienteTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteImagenesDomicilio: async () => {
    try {
      await db.delete(schema.fotoDomicilioTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  obtenerVerificacionesCabecera: async (
    params: IVerificacionesCabeceraParams
  ) => {
    try {
      const filtros = [
        eq(schema.verificacionesTable.esVerificado, 0),
        gte(
          sql`date(${schema.verificacionesTable.fecha})`,
          sql`date('now', 'start of month')`
        ),
        params.tipoRuta
          ? eq(schema.verificacionesTable.codigoTipoRuta, params.tipoRuta)
          : undefined,
        params.nombreCliente
          ? like(schema.clientesTable.nombres, `%${params.nombreCliente}%`)
          : undefined,
      ].filter(Boolean);

      const datos: IVerificacionesCabecera[] = await db
        .selectDistinct({
          codigoTipoDeRuta: schema.verificacionesTable.codigoTipoRuta,
          fecha: schema.verificacionesTable.fecha,
          identificacion: schema.verificacionesTable.identificacionCliente,
          nombres: schema.clientesTable.nombres,
          apellidos: schema.clientesTable.apellidos,
          direccion: schema.direccionTable.direccion,
          direccionTrabajo: schema.clientesTable.direccionEmpresa,
          fotoCliente: schema.fotoClienteTable.fotoCliente,
          fotoDomicilio: schema.fotoDomicilioTable.fotoDelDomicilio,
          telefono: schema.clientesTable.telefono,
        })
        .from(schema.verificacionesTable)
        .innerJoin(
          schema.clientesTable,
          eq(
            schema.clientesTable.identificacion,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.direccionTable,
          eq(
            schema.direccionTable.identificacionCliente,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.fotoClienteTable,
          eq(
            schema.fotoClienteTable.identificacionCliente,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.fotoDomicilioTable,
          eq(
            schema.fotoDomicilioTable.identificacionCliente,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .where(and(...filtros))
        .orderBy(asc(schema.verificacionesTable.fecha));
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
    params: IVerificacionDetallesParams
  ) => {
    try {
      const detallesVerificaciones: IVerificacionDetalles[] = await db
        .select({
          datosGenerales: {
            cedulaCliente: schema.clientesTable.identificacion,
            nombreCliente: schema.clientesTable.nombres,
            apellidoCliente: schema.clientesTable.apellidos,
            estadoCivil: schema.clientesTable.estadoCivil,
            dependientes: schema.clientesTable.nroDependientes,
            telefono: schema.clientesTable.telefono,
            observacion: schema.clientesTable.observacion,
            referencias: schema.clientesTable.referencias,
            detalleAdicional: schema.direccionTable.observacionesAdicionales,
          },
          buro: {
            categoria: schema.clientesTable.categoria,
            score: schema.clientesTable.score,
            producto: schema.clientesTable.productos,
          },
          datosConyugue: {
            cedulaConyuge: schema.clienteConyugueTable.identificacion,
            nombre: schema.clienteConyugueTable.nombres,
            apellidos: schema.clienteConyugueTable.apellidos,
            celular: schema.clienteConyugueTable.celularConyugue,
          },
          datosVivienda: {
            direccion: schema.direccionTable.direccion,
            zona: schema.zonaTable.nombres,
            tipoVivienda: schema.direccionTable.tipoVivienda,
            nombreDueno: schema.direccionTable.nombreDueno,
            telDueno: schema.clientesTable.telefonoDuenoCasa,
            construccon: schema.direccionTable.tipoConstruccion,
          },
          actividadEconomica: {
            ocupacionLaboral: schema.clientesTable.ocupacionLaboral,
            empresa: schema.clientesTable.nombreEmpresa,
            antiguedad: schema.clientesTable.antiguedad,
            cargo: schema.clientesTable.cargo,
            jefe: schema.clientesTable.nombreJefe,
            ingresos: schema.clientesTable.ingresos,
            telEmpresa: schema.clientesTable.telefonoEmpresa,
            celJefe: schema.clientesTable.celularJefe,
            dirEmpresa: schema.clientesTable.direccionEmpresa,
          },
          actividadEconomicaConyugue: {
            ocupacionLaboral: schema.clienteConyugueTable.ocupacionLaboral,
            empresa: schema.clienteConyugueTable.nombreEmpresa,
            antiguedad: schema.clienteConyugueTable.antiguedad,
            cargo: schema.clienteConyugueTable.cargo,
            jefe: schema.clienteConyugueTable.nombreJefe,
            ingresos: schema.clienteConyugueTable.ingresos,
            telEmpresa: schema.clienteConyugueTable.telefonoEmpresa,
            celJefe: schema.clienteConyugueTable.celularJefe,
            dirEmpresa: schema.clienteConyugueTable.direccionEmpresa,
          },
        })
        .from(schema.clientesTable)
        .innerJoin(
          schema.verificacionesTable,
          eq(
            schema.clientesTable.identificacion,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.direccionTable,
          eq(
            schema.direccionTable.identificacionCliente,
            schema.verificacionesTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.zonaTable,
          eq(schema.verificacionesTable.codigoZona, schema.zonaTable.codigo)
        )
        .leftJoin(
          schema.clienteConyugueTable,
          eq(
            schema.clienteConyugueTable.identificacionCliente,
            schema.clientesTable.identificacion
          )
        )
        .where(eq(schema.clientesTable.identificacion, params.identificacion));

      return detallesVerificaciones[0];
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },

  /// se maneja los errores de esta forma ya que el hook de tanskquery puede obtener un objeto
  actualizarVerificaciones: async (data: IActualizarVerificacion) => {
    try {
      const query = await db
        .update(schema.verificacionesTable)
        .set({
          esVerificado: data.calificacion,
        })
        .where(
          and(
            eq(
              schema.verificacionesTable.codigoTipoRuta,
              data.codigoTipoGestion
            ),
            eq(
              schema.verificacionesTable.identificacionCliente,
              data.identificacionCliente
            ),
            !data.reversar
              ? eq(schema.verificacionesTable.esVerificado, 0)
              : gt(schema.verificacionesTable.esVerificado, 0)
          )
        );
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
        calificacion:
          data.calificacion === 3 ? 2 : data.calificacion === 4 ? 9 : 1,
        codigoTipoGestion: data.codigoTipoGestion,
        identificacionCliente: data.identificacionCliente,
        reversar: false,
      });

      if (data.calificacion === 1 || data.calificacion === 2) {
        const insertVeri = await db
          .insert(schema.verificacionesResultadoTable)
          .values({
            observaciones: data.observaciones,
            codigoDireccion: data.codigoDireccion,
            codigoTipoGestion: data.codigoTipoRuta,
            codigoTipoRuta: data.codigoTipoRuta,
            fecha: data.fecha,
            identificacionAgente: data.identificacionAgente,
            identificacionCliente: data.identificacionCliente,
            latitud: data.latitud,
            longitud: data.longitud,
            verificacion: data.calificacion,
            id: data.id, // es un uuid
          });

        const insertImg = await db
          .insert(schema.imagenVerificacionTable)
          .values(data.imagenes);

        if (insertImg.changes === 0 || insertVeri.changes === 0) {
          // tx.rollback();
          throw { message: "No se pudo guardar la verificacion" };
        }
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
          id: schema.verificacionesResultadoTable.id,
          tipoGestion: sql`CASE WHEN ${schema.verificacionesResultadoTable.codigoTipoGestion} = 1 THEN 'VERIFICACION DOMICILIO' WHEN ${schema.verificacionesResultadoTable.codigoTipoGestion} = 2 THEN 'VERIFICACION TRABAJO' END`,
          fecha: schema.verificacionesResultadoTable.fecha,
          cliente: sql`(${schema.clientesTable.apellidos} || ' ' || ${schema.clientesTable.nombres})`,
          calificacion: sql`CASE WHEN ${schema.verificacionesResultadoTable.verificacion} = 1 THEN 'POSITIVA' WHEN ${schema.verificacionesResultadoTable.verificacion} = 2 THEN 'NEGATIVA' END`,
          factura: sql`'VERIFICACION'`,
          identificacionCliente: schema.clientesTable.identificacion,
        })
        .from(schema.verificacionesResultadoTable)
        .leftJoin(
          schema.clientesTable,
          eq(
            schema.verificacionesResultadoTable.identificacionCliente,
            schema.clientesTable.identificacion
          )
        );

      const verificaciones2 = await db
        .select({
          id: schema.verificacionesTable.identificacionCliente,
          tipoGestion: sql`CASE WHEN ${schema.verificacionesTable.codigoTipoRuta} = 1 THEN 'VERIFICACION DOMICILIO' WHEN ${schema.verificacionesTable.codigoTipoRuta} = 2 THEN 'VERIFICACION TRABAJO' END`,
          fecha: schema.verificacionesTable.fecha,
          cliente: sql`(${schema.clientesTable.apellidos} || ' ' || ${schema.clientesTable.nombres})`,
          calificacion: sql`CASE WHEN ${schema.verificacionesTable.esVerificado} = 2 THEN 'REASIGNAR' WHEN ${schema.verificacionesTable.esVerificado} = 9 THEN 'ANULAR' END`,
          factura: sql`'VERIFICACION'`,
          identificacionCliente:
            schema.verificacionesTable.identificacionCliente,
        })
        .from(schema.verificacionesTable)
        .innerJoin(
          schema.clientesTable,
          eq(
            schema.verificacionesTable.identificacionCliente,
            schema.clientesTable.identificacion
          )
        )
        .where(
          and(
            ne(schema.verificacionesTable.esVerificado, 0),
            eq(schema.verificacionesTable.sincronizado, 0)
          )
        );

      //une los datos de verificaciones y verificaciones2
      const unionData = unionBy(
        verificaciones,
        verificaciones2,
        (item) =>
          `${item.cliente}-${item.factura}-${item.identificacionCliente}-${item.tipoGestion}`
      );

      const verificacionesSubir: ISubirInformacion[] = unionData;

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
        .delete(schema.verificacionesResultadoTable)
        .where(
          and(
            eq(
              schema.verificacionesResultadoTable.codigoTipoGestion,
              datos.tipoGestion
            ),
            eq(
              schema.verificacionesResultadoTable.verificacion,
              datos.calificacion
            ),
            eq(
              schema.verificacionesResultadoTable.identificacionCliente,
              datos.cedulaCliente
            )
          )
        );

      const deleteImagen = await db
        .delete(schema.imagenVerificacionTable)
        .where(eq(schema.imagenVerificacionTable.idVerificacion, datos.id));

      if (res.changes === 0 || deleteImagen.changes === 0) {
        throw { message: "Error al eliminar la gestion" };
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
      const tipoGestion =
        datos.tipoGestion === "VERIFICACION DOMICILIO" ? 1 : 2;

      const calificacion = datos.calificacion === "POSITIVA" ? 1 : 2;
      if (datos.modulo === "verificacion") {
        await dbSqliteService.eliminarVerificaciones({
          calificacion: calificacion,
          cedulaCliente: datos.identificacionCliente,
          tipoGestion: tipoGestion,
          id: datos.id,
        });

        await dbSqliteService.actualizarVerificaciones({
          calificacion: 0,
          codigoTipoGestion: tipoGestion,
          identificacionCliente: datos.identificacionCliente,
          reversar: true,
        });
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerCabeceraGestiones: async () => {
    try {
      const maxValue = await db
        .select({
          max: sql`DATE(MAX(${schema.enviarGcobranzaCelularTable.fecha}))`,
        })
        .from(schema.enviarGcobranzaCelularTable);

      const cabeceraGestiones: IGestiones[] = await db
        .selectDistinct({
          identificacionCliente:
            schema.enviarGcobranzaCelularTable.identificacionCliente,
          fechaAdicion: schema.enviarGcobranzaCelularTable.fecha,
          deudaTotal: schema.documentosGcobranzaTable.deudaTotal,
          saldoVencido: schema.documentosGcobranzaTable.saldoVencido,
          tramo: schema.documentosGcobranzaTable.tramo,
          apellidos: schema.enviarGcobranzaCelularTable.apellidoCliente,
          nombres: schema.enviarGcobranzaCelularTable.nombreCliente,
          direccion: schema.enviarGcobranzaCelularTable.direccion,
          latitud: schema.enviarGcobranzaCelularTable.latitud,
          longitud: schema.enviarGcobranzaCelularTable.longitud,
          zonaNombre: schema.zonaTable.nombres,
          imagenCliente: schema.fotoClienteTable.fotoCliente,
          imagenDomicilio: schema.fotoDomicilioTable.fotoDelDomicilio,
        })
        .from(schema.enviarGcobranzaCelularTable)
        .innerJoin(
          schema.documentosGcobranzaTable,
          eq(
            schema.enviarGcobranzaCelularTable.identificacionCliente,
            schema.documentosGcobranzaTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.zonaTable,
          eq(
            schema.zonaTable.codigo,
            schema.enviarGcobranzaCelularTable.codigoZona
          )
        )
        .leftJoin(
          schema.fotoClienteTable,
          eq(
            schema.fotoClienteTable.identificacionCliente,
            schema.enviarGcobranzaCelularTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.fotoDomicilioTable,
          eq(
            schema.fotoDomicilioTable.identificacionCliente,
            schema.enviarGcobranzaCelularTable.identificacionCliente
          )
        )
        .where(
          and(
            eq(
              schema.enviarGcobranzaCelularTable.periodo,
              Number(format(new Date(), "yyyyMM"))
            ),
            eq(schema.enviarGcobranzaCelularTable.esGestionado, 0),
            eq(
              sql`DATE(${schema.enviarGcobranzaCelularTable.fecha})`,
              maxValue[0]?.max
            )
          )
        )
        .orderBy(schema.enviarGcobranzaCelularTable.apellidoCliente);
      const resultado = mapValues(
        groupBy(cabeceraGestiones, "identificacionCliente"),
        (items) => ({
          imagenCliente: items[0].imagenCliente,
          imagenDomicilio: items[0].imagenDomicilio,
          identificacionCliente: items[0].identificacionCliente,
          apellidos: items[0].apellidos,
          nombres: items[0].nombres,
          direccion: items[0].direccion,
          fechaAdicion: items[0].fechaAdicion,
          latitud: items[0].latitud,
          longitud: items[0].longitud,
          tramo: items[0].tramo,
          zonaNombre: items[0].zonaNombre,
          deudaTotal: sumBy(items, "deudaTotal"),
          saldoVencido: sumBy(items, "saldoVencido"),
        })
      );
      const res: IGestiones[] = Object.values(resultado);

      return res;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
};
