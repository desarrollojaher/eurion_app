import * as schema from "@/db/schema";
import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  isNotNull,
  like,
  ne,
  or,
  sql,
} from "drizzle-orm";
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
  ISubirInformacionActualizaciones,
  ISubirInformacionActualizacionesGeneral,
  ISubirInformacionEliminar,
} from "@/models/ISubirInformacion";
import {
  IImagenCliente,
  IImagenDomicilio,
  IImagenRecibos,
} from "@/models/IImagenes";
import _, { groupBy, mapValues, sumBy, union, unionBy } from "lodash";
import {
  IDocumentoPasadoParams,
  IDocumentos,
  IDocumentosCabecera,
} from "@/models/IDocumentos";
import { IEnviarGcobranza } from "@/models/IEnviarGcobranza";
import { format } from "date-fns";
import { IGestiones, IGestionesFiltro } from "@/models/IGestiones";
import { IZona } from "@/models/IZona";
import {
  ITiposGestiones,
  ITiposGestionesObtener,
} from "@/models/ITiposGestiones";
import {
  IGestionesCelular,
  IGestionesCelularCrear,
  IGestionesCelularPasadas,
} from "@/models/IGestionesCelular";
import { IClienteGarante } from "@/models/IClienteGarante";
import { IDetalleFactura } from "@/models/IDetalleFactura";
import { ISincronizado } from "@/models/ISincronizado";
import {
  ICliente,
  IClienteGaranteCobranza,
  IClienteParams,
} from "@/models/ICliente";
import { IClienteConyugue } from "@/models/IConyugue";
import { IDireccionGcobranza } from "@/models/IDireccion";
import {
  IDireccionCelularGcobranza,
  imagenActualizacion,
} from "@/models/IDireccionCelularGcobranza";
import {
  IReciboEnviar,
  IRecibosCabecera,
  IRecibosCabeceraListado,
  IRecibosCabeceraParams,
  IRecibosEliminarParams,
} from "@/models/IRecibo";
import { IFormaPago } from "@/models/IFormaPago";
import { ITarjetaCredito } from "@/models/ITarjetaCredito";
import { IBancos } from "@/models/IBancos";
import { ICabeceraReciboCelular } from "@/models/ICabeceraReciboCelular";
import { IDetalleReciboCelular } from "@/models/IDetalleReciboCelular";

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
      await db
        .insert(schema.enviarGcobranzaCelularTable)
        .values(datos)
        .onConflictDoNothing({
          target: [
            schema.enviarGcobranzaCelularTable.identificacionCliente,
            schema.enviarGcobranzaCelularTable.nroDocumento,
            schema.enviarGcobranzaCelularTable.periodo,
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
  insertarTipoGestiones: async (datos: ITiposGestiones[]) => {
    try {
      await db.insert(schema.tipoGestionesTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarGestionesCelular: async (datos: IGestionesCelular[]) => {
    try {
      await db.insert(schema.gestionesCelularGcobranzaTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarClienteGarante: async (datos: IClienteGarante[]) => {
    try {
      await db.insert(schema.clienteGaranteGcobranzaTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarDetalleFactura: async (datos: IDetalleFactura[]) => {
    try {
      await db.insert(schema.detalleFacturaGcobranzaTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarFormaPago: async (datos: IFormaPago[]) => {
    try {
      await db.insert(schema.formasPagoTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarTarjetaCredito: async (datos: ITarjetaCredito[]) => {
    try {
      await db.insert(schema.tarjetasCreditoTable).values(datos);
      return true;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  insertarBanco: async (datos: IBancos[]) => {
    try {
      await db.insert(schema.bancoTable).values(datos);
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
      await db
        .delete(schema.enviarGcobranzaCelularTable)
        .where(eq(schema.enviarGcobranzaCelularTable.esGestionado, 0));
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteTipoGestiones: async () => {
    try {
      await db.delete(schema.tipoGestionesTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },
  deleteGestionesCelular: async () => {
    try {
      await db.delete(schema.gestionesCelularGcobranzaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteClientesGarante: async () => {
    try {
      await db.delete(schema.clienteGaranteGcobranzaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteDetalleFactura: async () => {
    try {
      await db.delete(schema.detalleFacturaGcobranzaTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteFormaPago: async () => {
    try {
      await db.delete(schema.formasPagoTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteTarjetaCredito: async () => {
    try {
      await db.delete(schema.tarjetasCreditoTable);
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw JSON.stringify(mensajeExtraido);
    }
  },

  deleteBancos: async () => {
    try {
      await db.delete(schema.bancoTable);
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
          observacion: schema.verificacionesResultadoTable.observaciones,
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
          observacion: sql`'SIN OBSERVACION'`,
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

  obtenerGestionesRealizadas: async () => {
    try {
      const gestionesRealizadas: ISubirInformacion[] = await db
        .select({
          id: schema.gestionesCelularGcobranzaTable.identificacionCliente,
          tipoGestion: schema.tipoGestionesTable.descripcion,
          fecha: schema.gestionesCelularGcobranzaTable.fechaGestion,
          cliente: schema.clientesTable.nombres,
          factura: schema.gestionesCelularGcobranzaTable.nroDocumento,
          identificacionCliente:
            schema.gestionesCelularGcobranzaTable.identificacionCliente,
          observacion: schema.gestionesCelularGcobranzaTable.observaciones,
        })
        .from(schema.gestionesCelularGcobranzaTable)
        .leftJoin(
          schema.clientesTable,
          eq(
            schema.clientesTable.identificacion,
            schema.gestionesCelularGcobranzaTable.identificacionCliente
          )
        )
        .leftJoin(
          schema.tipoGestionesTable,
          eq(
            schema.tipoGestionesTable.codigo,
            schema.gestionesCelularGcobranzaTable.codigoTipoGestion
          )
        )
        .where(and(eq(schema.gestionesCelularGcobranzaTable.sincronizado, 0)));
      return gestionesRealizadas;
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

      const gestionesRealizadas =
        await dbSqliteService.obtenerGestionesRealizadas();

      const gestionesRealizadasUnion: ISubirInformacion[] = union(
        verificaciones,
        gestionesRealizadas
      );
      return gestionesRealizadasUnion;
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

  eliminarGestionesCelular: async (datos: ISubirInformacionEliminar) => {
    try {
      await db.run("BEGIN TRANSACTION");
      const tipoGestiones = await db
        .select()
        .from(schema.tipoGestionesTable)
        .where(eq(schema.tipoGestionesTable.descripcion, datos.tipoGestion));
      const res = await db
        .delete(schema.gestionesCelularGcobranzaTable)
        .where(
          and(
            eq(schema.gestionesCelularGcobranzaTable.sincronizado, 0),
            eq(
              schema.gestionesCelularGcobranzaTable.identificacionCliente,
              datos.identificacionCliente
            ),
            eq(
              schema.gestionesCelularGcobranzaTable.codigoTipoGestion,
              tipoGestiones[0].codigo ?? ""
            ),
            eq(
              schema.gestionesCelularGcobranzaTable.nroDocumento,
              datos.factura ?? ""
            )
          )
        );

      if (res.changes === 0) {
        await db.run("ROLLBACK");
        throw { message: "Error al eliminar la gestion" };
      }

      const res2 = await db
        .update(schema.enviarGcobranzaCelularTable)
        .set({
          esGestionado: 0,
        })
        .where(
          and(
            eq(
              schema.enviarGcobranzaCelularTable.identificacionCliente,
              datos.identificacionCliente
            ),
            eq(
              schema.enviarGcobranzaCelularTable.nroDocumento,
              datos.factura ?? ""
            ),
            eq(
              schema.enviarGcobranzaCelularTable.periodo,
              Number(format(new Date(), "yyyyMM"))
            )
          )
        );
      if (res2.changes === 0) {
        await db.run("ROLLBACK");
        throw { message: "Error al eliminar la gestion" };
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

  eliminarInformacionGestionada: async (datos: ISubirInformacionEliminar) => {
    try {
      const tipoGestion =
        datos.tipoGestion === "VERIFICACION DOMICILIO" ? 1 : 2;

      const calificacion = datos.calificacion === "POSITIVA" ? 1 : 2;
      if (datos.modulo === "verificacion") {
        await db.run("BEGIN TRANSACTION");
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

        await db.run("COMMIT");
      }
      if (datos.modulo === "gestion") {
        await dbSqliteService.eliminarGestionesCelular(datos);
      }
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerCabeceraGestiones: async (filtro: IGestionesFiltro) => {
    try {
      const filtros = [
        filtro.buscador
          ? or(
              like(
                schema.enviarGcobranzaCelularTable.nombreCliente,
                `%${filtro.buscador}%`
              ),
              like(
                schema.enviarGcobranzaCelularTable.apellidoCliente,
                `%${filtro.buscador}%`
              )
            )
          : undefined,
        filtro.zona === "todos"
          ? undefined
          : eq(schema.zonaTable.codigo, filtro.zona),
      ].filter(Boolean);

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
          latitud: schema.direccionTable.latitud,
          longitud: schema.direccionTable.longitud,
          zonaNombre: schema.zonaTable.nombres,
          imagenCliente: schema.fotoClienteTable.fotoCliente,
          imagenDomicilio: schema.fotoDomicilioTable.fotoDelDomicilio,
          telefono: schema.clientesTable.telefono,
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
          schema.clientesTable,
          and(
            eq(schema.clientesTable.tipo, 2),
            eq(
              schema.clientesTable.identificacion,
              schema.enviarGcobranzaCelularTable.identificacionCliente
            )
          )
        )
        .leftJoin(
          schema.direccionTable,
          eq(
            schema.direccionTable.identificacionCliente,
            schema.enviarGcobranzaCelularTable.identificacionCliente
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
            eq(schema.direccionTable.tipo, 2),
            eq(
              sql`DATE(${schema.enviarGcobranzaCelularTable.fecha})`,
              maxValue[0]?.max
            ),
            ...filtros
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
          telefono: items[0].telefono,
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

  obtenerZonas: async () => {
    try {
      const zonas: IZona[] = await db.select().from(schema.zonaTable);
      return zonas;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerClienteCobranza: async (params: IClienteParams) => {
    try {
      const clientes: ICliente[] = await db
        .select({
          identificacion: schema.clientesTable.identificacion,
          nombres: schema.clientesTable.nombres,
          apellido: schema.clientesTable.apellidos,
          estadoCivil: schema.clientesTable.estadoCivil,
          dependientes: schema.clientesTable.nroDependientes,
          telefono: schema.clientesTable.telefono,
          referencias: schema.clientesTable.referencias,
          observacion: schema.clientesTable.observacion,
        })
        .from(schema.clientesTable)
        .where(
          and(
            eq(schema.clientesTable.tipo, 2),
            eq(schema.clientesTable.identificacion, params.identificacion)
          )
        );
      return clientes;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerClienteConyugue: async (params: IClienteParams) => {
    try {
      const clientesConyugue: IClienteConyugue[] = await db
        .select({
          identificacion: schema.clienteConyugueTable.identificacion,
          nombres: schema.clienteConyugueTable.nombres,
          apellido: schema.clienteConyugueTable.apellidos,
          ocupacionLaboral: schema.clienteConyugueTable.ocupacionLaboral,
          referencias: schema.clienteConyugueTable.referencias,
          antiguedad: schema.clienteConyugueTable.antiguedad,
        })
        .from(schema.clienteConyugueTable)
        .where(
          eq(
            schema.clienteConyugueTable.identificacionCliente,
            params.identificacion
          )
        );
      return clientesConyugue;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerClienteGarante: async (params: IClienteParams) => {
    try {
      const clientesGarante: IClienteGaranteCobranza[] = await db
        .select({
          identificacion: schema.clienteGaranteGcobranzaTable.identificacion,
          nombres: schema.clienteGaranteGcobranzaTable.nombre,
          telefono: schema.clienteGaranteGcobranzaTable.telefono,
          direccion: schema.clienteGaranteGcobranzaTable.direccion,
          detalleDireccion:
            schema.clienteGaranteGcobranzaTable.detalleDireccion,
          trabajaEn: schema.clienteGaranteGcobranzaTable.trabajaEn,
          direccionTrabajo:
            schema.clienteGaranteGcobranzaTable.direccionTrabajo,
          telefonoTrabajo: schema.clienteGaranteGcobranzaTable.telefonoTrabajo,
          celular: schema.clienteGaranteGcobranzaTable.celular,
        })
        .from(schema.clienteGaranteGcobranzaTable)
        .where(
          eq(
            schema.clienteGaranteGcobranzaTable.identificacionCliente,
            params.identificacion
          )
        );
      return clientesGarante;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerDirecconViviendaGcobranza: async (params: IClienteParams) => {
    try {
      const direccionesGcobranza: IDireccionGcobranza[] = await db
        .select({
          direccion: schema.direccionTable.direccion,
          tipoVivienda: schema.direccionTable.tipoVivienda,
          nombrePropietario: schema.direccionTable.nombreDueno,
        })
        .from(schema.direccionTable)
        .where(
          and(
            eq(schema.direccionTable.tipo, 2),
            eq(
              schema.direccionTable.identificacionCliente,
              params.identificacion
            )
          )
        );
      return direccionesGcobranza;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerDocumentosCabeceraGcobranza: async (params: IClienteParams) => {
    try {
      const documentos: IDocumentosCabecera[] = await db
        .selectDistinct({
          nroDocumento: schema.enviarGcobranzaCelularTable.nroDocumento,
          cuotasPagadas: schema.documentosGcobranzaTable.cuotasPagadas,
          deudaTotal: schema.documentosGcobranzaTable.deudaTotal,
          saldoVencido: schema.documentosGcobranzaTable.saldoVencido,
          producto: schema.detalleFacturaGcobranzaTable.producto,
          fecha: schema.documentosGcobranzaTable.fechaEmision,
          interesMora: schema.documentosGcobranzaTable.interesMora,
          gastosCobranza: schema.documentosGcobranzaTable.gastosDeCobranza,
        })
        .from(schema.enviarGcobranzaCelularTable)
        .innerJoin(
          schema.documentosGcobranzaTable,
          and(
            eq(
              schema.documentosGcobranzaTable.identificacionCliente,
              schema.enviarGcobranzaCelularTable.identificacionCliente
            ),
            eq(
              schema.documentosGcobranzaTable.nroDocumento,
              schema.enviarGcobranzaCelularTable.nroDocumento
            )
          )
        )
        .leftJoin(
          schema.detalleFacturaGcobranzaTable,
          eq(
            schema.detalleFacturaGcobranzaTable.nroDocumento,
            schema.enviarGcobranzaCelularTable.nroDocumento
          )
        )
        .where(
          eq(
            schema.enviarGcobranzaCelularTable.identificacionCliente,
            params.identificacion
          )
        );
      return documentos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerGestionesPasadas: async (params: IDocumentoPasadoParams) => {
    try {
      const gestionesPasadas: IGestionesCelularPasadas[] = await db
        .selectDistinct({
          observacion: schema.gestionesCelularGcobranzaTable.observaciones,
          fechaGestion: schema.gestionesCelularGcobranzaTable.fechaGestion,
          tipoGestion: schema.tipoGestionesTable.descripcion,
          // gestor: schema.agen,
        })
        .from(schema.gestionesCelularGcobranzaTable)
        .leftJoin(
          schema.tipoGestionesTable,
          eq(
            schema.gestionesCelularGcobranzaTable.codigoTipoGestion,
            schema.tipoGestionesTable.codigo
          )
        )
        .where(
          eq(
            schema.gestionesCelularGcobranzaTable.nroDocumento,
            params.nroDocumento
          )
        )
        .orderBy(desc(schema.gestionesCelularGcobranzaTable.fechaGestion));
      return gestionesPasadas;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerDocumentoCompleto: async (params: IDocumentoPasadoParams) => {
    try {
      const documentos: IDocumentos[] = await db
        .select()
        .from(schema.documentosGcobranzaTable)
        .where(
          eq(schema.documentosGcobranzaTable.nroDocumento, params.nroDocumento)
        );
      return documentos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  guardarActualizacionDireccion: async (datos: IDireccionCelularGcobranza) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db.insert(schema.direccionCelularGcobranzaTable).values(datos);
      const datosImagen: imagenActualizacion[] = [];
      datos.imagenes?.map((item) => {
        datosImagen.push({
          identiticacionCliente: datos.identificacionCliente,
          imagen: item.url,
          titulo: item.titulo,
        });
      });
      await db
        .insert(schema.imagenesActualizarDireccionTable)
        .values(datosImagen);
      await db.run("COMMIT TRANSACTION");
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerTiposGestiones: async () => {
    try {
      const tiposGestiones: ITiposGestionesObtener[] = await db
        .select()
        .from(schema.tipoGestionesTable);
      return tiposGestiones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  guargarGestionesCelular: async (data: IGestionesCelularCrear) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db.insert(schema.gestionesCelularGcobranzaTable).values({
        codigoTipoGestion: data.codigoTipoGestion,
        nroDocumento: data.nroDocumento,
        identificacionCliente: data.identificacionCliente,
        observaciones: data.observaciones,
        fechaGestion: data.fechaGestion,
        latitud: data.latitud,
        longitud: data.longitud,
        codigoTipoGestionProxima: data.codigoTipoGestionProxima,
        fechaProximaGestion: data.fechaProximaGestion,
        observacionesProximaGestion: data.observacionesProximaGestion,
      });

      const cantidad = await db
        .update(schema.enviarGcobranzaCelularTable)
        .set({ esGestionado: 1 })
        .where(
          and(
            eq(
              schema.enviarGcobranzaCelularTable.nroDocumento,
              data.nroDocumento
            ),
            eq(
              schema.enviarGcobranzaCelularTable.identificacionCliente,
              data.identificacionCliente
            ),
            eq(schema.gestionesCelularGcobranzaTable.sincronizado, 0)
          )
        );
      if (cantidad.changes === 0) {
        await db.run("ROLLBACK");
        throw { message: "No se pudo actualizar el documento" };
      }
      db.run("COMMIT");
    } catch (error: any) {
      console.log(error);
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerActualizacionesDireccion: async () => {
    try {
      const actualizaciones: ISubirInformacionActualizacionesGeneral[] =
        await db
          .select({
            identificacionCliente:
              schema.direccionCelularGcobranzaTable.identificacionCliente,
            direccion: schema.direccionCelularGcobranzaTable.direccionIngresada,
            nombre: schema.clientesTable.nombres,
            fecha: schema.direccionCelularGcobranzaTable.fecha,
            direccionAdicional:
              schema.direccionCelularGcobranzaTable.indicacionesAdicionales,
            latitud: schema.direccionCelularGcobranzaTable.latitud,
            longitud: schema.direccionCelularGcobranzaTable.longitud,
            titulo: schema.imagenesActualizarDireccionTable.titulo,
            url: schema.imagenesActualizarDireccionTable.imagen,
          })
          .from(schema.direccionCelularGcobranzaTable)
          .leftJoin(
            schema.clientesTable,
            and(
              eq(
                schema.clientesTable.identificacion,
                schema.direccionCelularGcobranzaTable.identificacionCliente
              ),
              eq(schema.clientesTable.tipo, 2)
            )
          )
          .leftJoin(
            schema.imagenesActualizarDireccionTable,
            and(
              eq(
                schema.imagenesActualizarDireccionTable.identiticacionCliente,
                schema.direccionCelularGcobranzaTable.identificacionCliente
              ),
              eq(schema.imagenesActualizarDireccionTable.sincronizado, 0)
            )
          );

      const informacionActualizaciones: ISubirInformacionActualizaciones[] = _(
        actualizaciones
      )
        .groupBy("identificacionCliente")
        .map((items, identificacionCliente) => ({
          identificacionCliente,
          nombre: items[0].nombre,
          direccion: items[0].direccion,
          fecha: items[0].fecha,
          direccionAdicional: items[0].direccionAdicional,
          latitud: items[0].latitud,
          longitud: items[0].longitud,
          imagenes: items.map((item) => ({
            url: item.url,
            titulo: item.titulo,
          })),
        }))
        .value() as ISubirInformacionActualizaciones[];

      return informacionActualizaciones;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarActualizacionesDireccion: async (
    datos: ISubirInformacionActualizaciones
  ) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db
        .delete(schema.direccionCelularGcobranzaTable)
        .where(
          and(
            eq(
              schema.direccionCelularGcobranzaTable.identificacionCliente,
              datos.identificacionCliente ?? ""
            ),
            eq(
              schema.direccionCelularGcobranzaTable.direccionIngresada,
              datos.direccion ?? ""
            )
          )
        );

      await db
        .delete(schema.imagenesActualizarDireccionTable)
        .where(
          and(
            eq(
              schema.imagenesActualizarDireccionTable.identiticacionCliente,
              datos.identificacionCliente ?? ""
            ),
            eq(schema.imagenesActualizarDireccionTable.sincronizado, 0)
          )
        );

      await db.run("COMMIT");
    } catch (error: any) {
      await db.run("ROLLBACK");
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerRecibosCabecera: async (data: IRecibosCabeceraParams) => {
    try {
      const recibos = await db
        .selectDistinct({
          identificacionCliente:
            schema.enviarGcobranzaCelularTable.identificacionCliente,
          apellidos: schema.enviarGcobranzaCelularTable.apellidoCliente,
          nombres: schema.enviarGcobranzaCelularTable.nombreCliente,
          deudaTotal: schema.documentosGcobranzaTable.deudaTotal,
        })
        .from(schema.enviarGcobranzaCelularTable)
        .innerJoin(
          schema.documentosGcobranzaTable,
          and(
            eq(
              schema.enviarGcobranzaCelularTable.identificacionCliente,
              schema.documentosGcobranzaTable.identificacionCliente
            ),
            eq(
              schema.enviarGcobranzaCelularTable.nroDocumento,
              schema.documentosGcobranzaTable.nroDocumento
            ),
            isNotNull(schema.documentosGcobranzaTable.deudaTotal),
            gt(schema.documentosGcobranzaTable.saldoVencido, 0)
          )
        )
        .where(
          and(
            eq(
              schema.enviarGcobranzaCelularTable.periodo,
              Number(format(new Date(), "yyyyMM"))
            ),
            eq(schema.enviarGcobranzaCelularTable.esGestionado, 0),
            data.nombreCliente
              ? or(
                  like(
                    schema.enviarGcobranzaCelularTable.nombreCliente,
                    `%${data.nombreCliente}%`
                  ),
                  like(
                    schema.enviarGcobranzaCelularTable.apellidoCliente,
                    `%${data.nombreCliente}%`
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(schema.documentosGcobranzaTable.deudaTotal));

      console.log(recibos);

      const resultado = mapValues(
        groupBy(recibos, "identificacionCliente"),
        (items) => ({
          deudaTotal: sumBy(items, "deudaTotal"),
          identificacionCliente: items[0].identificacionCliente,
          apellidos: items[0].apellidos,
          nombres: items[0].nombres,
        })
      );
      const res: IRecibosCabecera[] = Object.values(resultado);

      return res;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },
  obtenerFormasPago: async () => {
    try {
      const formasPago: IFormaPago[] = await db
        .select()
        .from(schema.formasPagoTable);
      return formasPago;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  obtenerTarjetasCredito: async () => {
    try {
      const tarjetasCredito: ITarjetaCredito[] = await db
        .select()
        .from(schema.tarjetasCreditoTable);
      return tarjetasCredito;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  guardarRecibos: async (recibos: IReciboEnviar) => {
    try {
      await db.run("BEGIN TRANSACTION");
      const cabecera: ICabeceraReciboCelular = {
        latitud: recibos.latitud ?? 0,
        longitud: recibos.longitud ?? 0,
        nroDocumento: recibos.doctran,
        fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        observaciones: recibos.observaciones ?? "",
        total: recibos.valorCancela ?? 0,
        totalInteresMora: recibos.valorMora ?? 0,
        totalGastoCobranza: recibos.valorCobranza ?? 0,
        cobroTotalCuotas:
          (recibos.valorCancela ?? 0) +
          (recibos.valorCobranza ?? 0) +
          (recibos.valorMora ?? 0),
        identificacionCliente: recibos.identificacionCliente,
      };

      const id = await db
        .insert(schema.cabeceraReciboCelularTable)
        .values(cabecera)
        .returning({ insertedId: schema.cabeceraReciboCelularTable.id });

      const detalle: IDetalleReciboCelular[] = [];

      recibos.valores?.map((item) => {
        detalle.push({
          fechaVencimiento: item.fechaVencimiento ?? "",
          numeroCheque: item.numeroCheque ?? "",
          numeroCuenta: item.numeroCuenta ?? "",
          valorTotal: item.valor,
          idCabeceraReciboCelular: id[0].insertedId,
          numeroDocumento: item.numeroDocumento ?? "",
          codigoTipoPago: item.tipoPago,
          codigoEmisor: item.emisor ?? "",
          codigoBanco: item.banco ?? "",
        });
      });
      await db.insert(schema.detalleReciboCelularTable).values(detalle);

      const imagenes: IImagenRecibos[] = [];

      recibos.imagenes?.map((item) => {
        imagenes.push({
          nroDocumento: recibos.doctran,
          imagen: item.url,
          titulo: item.titulo,
          idCabecera: id[0].insertedId,
        });
      });
      await db.insert(schema.imagenesRecibosTable).values(imagenes);

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

  obtenerRecibos: async () => {
    try {
      const recibos: IRecibosCabeceraListado[] = await db
        .select({
          nombres: schema.clientesTable.nombres,
          apellidos: schema.clientesTable.apellidos,
          fecha: schema.cabeceraReciboCelularTable.fecha,
          capital: schema.cabeceraReciboCelularTable.total,
          interesMora: schema.cabeceraReciboCelularTable.totalInteresMora,
          gastoCobranza: schema.cabeceraReciboCelularTable.totalGastoCobranza,
          cobroTotalCuotas: schema.cabeceraReciboCelularTable.cobroTotalCuotas,
          id: schema.cabeceraReciboCelularTable.id,
        })
        .from(schema.cabeceraReciboCelularTable)
        .leftJoin(
          schema.clientesTable,
          and(
            eq(
              schema.clientesTable.identificacion,
              schema.cabeceraReciboCelularTable.identificacionCliente
            ),
            eq(schema.clientesTable.tipo, 2)
          )
        )
        .where(eq(schema.cabeceraReciboCelularTable.sincronizado, 0));

      return recibos;
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      throw { message: mensajeExtraido };
    }
  },

  eliminarRecibos: async (params: IRecibosEliminarParams) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db
        .delete(schema.cabeceraReciboCelularTable)
        .where(
          and(
            eq(schema.cabeceraReciboCelularTable.sincronizado, 0),
            eq(schema.cabeceraReciboCelularTable.id, params.id)
          )
        );

      await db
        .delete(schema.detalleReciboCelularTable)
        .where(
          and(
            eq(schema.detalleReciboCelularTable.sincronizado, 0),
            eq(schema.detalleReciboCelularTable.id, params.id)
          )
        );

      await db
        .delete(schema.imagenesRecibosTable)
        .where(
          and(
            eq(schema.imagenesRecibosTable.sincronizado, 0),
            eq(schema.imagenesRecibosTable.idCabecera, params.id)
          )
        );

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
};
