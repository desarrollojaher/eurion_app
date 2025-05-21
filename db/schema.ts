import { unique } from "drizzle-orm/sqlite-core";
import { integer } from "drizzle-orm/sqlite-core";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usuarioTable = sqliteTable("usuario", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});

export const verificacionesTable = sqliteTable(
  "verificaciones",
  {
    fecha: text(),
    identificacionCliente: text(),
    codigoDireccion: text(),
    codigoZona: text(),
    identificacionAgente: text(),
    codigoTipoRuta: int(),
    esVerificado: int(),
    sincronizado: int().default(0),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(
        table.identificacionCliente,
        table.codigoTipoRuta
      ),
    };
  }
);

export const clientesTable = sqliteTable("clientes", {
  identificacion: text(),
  nombres: text(),
  apellidos: text(),
  telefono: text(),
  email: text(),
  estadoCivil: text(),
  nroDependientes: int(),
  ocupacionLaboral: text(),
  nombreEmpresa: text(),
  antiguedad: text(),
  cargo: text(),
  nombreJefe: text(),
  ingresos: integer({ mode: "number" }),
  telefonoEmpresa: text(),
  celularJefe: text(),
  direccionEmpresa: text(),
  referencias: text(),
  observacion: text(),
  cupoCredito: int(),
  montoDisponible: int(),
  chequesPendientes: int(),
  productos: text(),
  score: int(),
  categoria: text(),
  telefonoDuenoCasa: text(),
  tipo: int(),
});

export const clienteConyugueTable = sqliteTable("cliente_conyuge", {
  identificacionCliente: text(),
  nombres: text(),
  identificacion: text(),
  apellidos: text(),
  ocupacionLaboral: text(),
  nombreEmpresa: text(),
  antiguedad: text(),
  cargo: text(),
  nombreJefe: text(),
  ingresos: integer({ mode: "number" }),
  telefonoEmpresa: text(),
  celularJefe: text(),
  direccionEmpresa: text(),
  referencias: text(),
  celularConyugue: text(),
});

export const direccionTable = sqliteTable("direccion", {
  codigo: text(),
  identificacionCliente: text(),
  direccion: text(),
  tipoVivienda: text(),
  nombreDueno: text(),
  latitud: integer({ mode: "number" }),
  longitud: integer({ mode: "number" }),
  observacionesAdicionales: text(),
  tipoResidencia: text(),
  tipoConstruccion: text(),
  tipo: int(),
});

export const zonaTable = sqliteTable("zona", {
  codigo: text(),
  nombres: text(),
});

export const fotoClienteTable = sqliteTable(
  "foto_cliente",
  {
    identificacionCliente: text(),
    fotoCliente: text(),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.identificacionCliente),
    };
  }
);

export const fotoDomicilioTable = sqliteTable(
  "foto_del_domicilio",
  {
    identificacionCliente: text(),
    fotoDelDomicilio: text(),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.identificacionCliente),
    };
  }
);

export const verificacionesResultadoTable = sqliteTable(
  "verificaciones_resultado",
  {
    id: text(),
    fecha: text(),
    observaciones: text(),
    codigoTipoGestion: int(),
    verificacion: int(),
    identificacionCliente: text(),
    identificacionAgente: text(),
    codigoDireccion: text(),
    latitud: integer({ mode: "number" }),
    longitud: integer({ mode: "number" }),
    codigoTipoRuta: int(),
    sincronizado: int().default(0),
  }
);

export const imagenVerificacionTable = sqliteTable("imagen_verificacion", {
  id: text(),
  idVerificacion: text(),
  nombre: text(),
  imagen: text(),
  sincronizado: int().default(0),
});

// tablas para la parte de gcobranza
export const documentosGcobranzaTable = sqliteTable("documentos_gcobranza", {
  identificacionCliente: text(),
  numeroDePagos: int(),
  monto: integer({ mode: "number" }),
  montoCancelado: integer({ mode: "number" }),
  fechaEmision: text(),
  fechaVencimiento: text(),
  nroDocumento: text(),
  interesMora: integer({ mode: "number" }),
  tramo: text(),
  gastosDeCobranza: integer({ mode: "number" }),
  valorTotalVencido: integer({ mode: "number" }),
  deudaTotal: integer({ mode: "number" }),
  cuotasPagadas: text(),
  cuotasPendientes: text(),
  fechaUltimoPago: text(),
  totalPendiente: integer({ mode: "number" }),
  saldoVencido: integer({ mode: "number" }),
  estado: int(),
  saldoDelCredito: integer({ mode: "number" }),
  valorCuota: integer({ mode: "number" }),
});

export const enviarGcobranzaCelularTable = sqliteTable(
  "enviar_gcobranza_celular",
  {
    nroDocumento: text(),
    identificacionCliente: text(),
    codigoCargo: int(),
    fecha: text(),
    periodo: int(),
    codigoZona: text(),
    esGestionado: int(),
    nombreCliente: text(),
    apellidoCliente: text(),
    observaciones: text(),
    latitud: integer({ mode: "number" }),
    longitud: integer({ mode: "number" }),
    direccion: text(),
  }
);
///////
export const gestionesCelularGcobranzaTable = sqliteTable(
  "gestiones_celular_gcobranza",
  {
    nroDocumento: text(),
    fechaGestion: text(),
    observaciones: text(),
    codigoTipoGestion: text(),
    identificacionCliente: text(),
    fechaProximaGestion: text(),
    observacionesProximaGestion: text(),
    codigoTipoGestionProxima: text(),
    latitud: integer({ mode: "number" }),
    longitud: integer({ mode: "number" }),
    sincronizado: int().default(0),
  }
);

export const tipoGestionesTable = sqliteTable("tipo_de_gestion_gcobranza", {
  codigo: text(),
  descripcion: text(),
  pideFoto: int(),
  pideFecha: int(),
});

export const clienteGaranteGcobranzaTable = sqliteTable(
  "cliente_garante_gcobranza",
  {
    identificacion: text(),
    identificacionCliente: text(),
    nombre: text(),
    telefono: text(),
    direccion: text(),
    detalleDireccion: text(),
    trabajaEn: text(),
    direccionTrabajo: text(),
    telefonoTrabajo: text(),
    celular: text(),
  }
);

export const detalleFacturaGcobranzaTable = sqliteTable(
  "detalle_garante_gcobranza",
  {
    identificacionCliente: text(),
    nroDocumento: text(),
    producto: text(),
  }
);

export const bitacoraSincronizadoTable = sqliteTable("bitacora_sincronizado", {
  codigo: int().primaryKey({ autoIncrement: true }),
  fecha: text(),
});
