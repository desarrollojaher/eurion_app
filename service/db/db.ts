import * as schema from "@/db/schema";
import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";
import { and, asc, eq, gte, like, sql } from "drizzle-orm";
import {
  IActualizarVerificacion,
  IVerificacionDetalles,
  IVerificacionDetallesParams,
  IVerificacionesCabecera,
  IVerificacionesCabeceraParams,
  IVerificacionesGuardar,
} from "@/models/IVerificaciones";
import { db } from "@/app/_layout";

export const dbSqliteService = {
  insertarVerificaciones: async (datos: ISincronizarVerificaciones[]) => {
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

  deleteVerificaciones: async () => {
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
          // fotoCliente: fot.FOTO_CLIENTE,
          // mapaDelDomicilio: map.MAPA_DEL_DOMICILIO,
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
            referencias: schema.direccionTable.observacionesAdicionales,
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
            celJefe: schema.clientesTable.telefonoEmpresa,
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

  actualizarVerificaciones: async (data: IActualizarVerificacion) => {
    try {
      await db
        .update(schema.verificacionesTable)
        .set({
          esVerificado:
            data.calificacion === 3 ? 2 : data.calificacion === 4 ? 9 : 1,
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
            eq(schema.verificacionesTable.esVerificado, 0)
          )
        );
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },

  guardarGestionesVerificacion: async (data: IVerificacionesGuardar) => {
    try {
      await dbSqliteService.actualizarVerificaciones({
        calificacion: data.calificacion,
        codigoTipoGestion: data.codigoTipoGestion,
        identificacionCliente: data.identificacionAgente,
      });
      if (data.calificacion === 1 || data.calificacion === 2) {
        await db.insert(schema.verificacionesResultadoTable).values({
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

        await db.insert(schema.imagenVerificacionTable).values(data.imagenes);
        return true;
      }
    } catch (error: any) {
      const mensajeError = error?.message || "Error desconocido";
      const mensajeExtraido =
        mensajeError.split("Caused by:")[1]?.trim() || mensajeError;
      console.log(error);
      throw JSON.stringify(mensajeExtraido);
    }
  },
};
