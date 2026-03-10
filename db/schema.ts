import { unique } from "drizzle-orm/sqlite-core";
import { integer } from "drizzle-orm/sqlite-core";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bitacoraSincronizadoTable = sqliteTable("bitacora_sincronizado", {
  codigo: int().primaryKey({ autoIncrement: true }),
  fecha: text(),
  sincronizado: int().default(0),
  idCobrador: int(),
});

export const verificacionTable = sqliteTable(
  "verificacion",
  {
    idVerificacion: int(),
    idCliente: int(),
    fechaVerificacion: text(),
    latitudCliente: integer({ mode: "number" }),
    longitudCliente: integer({ mode: "number" }),
    tipoVerificacion: text(),
    identificacionCobrador: int(),
    periodo: text(),
    tdId: int(),
    producto: text(),
    procesado: int().default(0), //  0 no procesado - 1 procesado
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(
        table.idVerificacion,
        table.idCliente,
        table.periodo,
        table.tipoVerificacion
      ),
    };
  }
);

export const clienteTable = sqliteTable(
  "cliente",
  {
    idCliente: int(),
    personaId: int(),
    direccionCliente: text(),
    identificacionCliente: text(),
    nombreCliente: text(),
    apellidoCliente: text(),
    estadoCivilCliente: text(),
    dependientesCliente: int(),
    referencias: text(),
    observaciones: text(),
    categoriaCliente: text(),
    scoreCliente: int(),
    ocupacionLaboralCliente: text(),
    empresaLaboraCliente: text(),
    antiguedadCliente: int(),
    cargoCliente: text(),
    nombreJefeCliente: text(),
    ingresosCliente: integer({ mode: "number" }),
    telefonoEmpresaCliente: text(),
    celJefeCliente: text(),
    direccionTrabajoCliente: text(),
    fotoCliente: text(),
    bucketFotoCliente: text(),
    fotoDireccion: text(),
    bucketFotoDireccion: text(),
    telefonoCliente: text(),
    urlImgClienteLocal: text(),
    urlImgDireccionLocal: text(),
    tdId: int(),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.idCliente, table.tdId),
    };
  }
);

export const conyugueTable = sqliteTable(
  "conyugue",
  {
    identificacionConyugue: text(),
    nombresConyugue: text(),
    apellidosConyugue: text(),
    telefonoConyugue: text(),
    ocupacionLaboralConyugue: text(),
    empresaLaboraConyugue: text(),
    antiguedadConyugue: text(),
    cargoConyugue: text(),
    telefonoEmpresaConyugue: text(),
    celJefeConyugue: text(),
    direccionTrabajoConyugue: text(),
    idCliente: int(),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.idCliente),
    };
  }
);

export const viviendaTable = sqliteTable(
  "vivienda",
  {
    tipoVivienda: text(),
    nombreDuenoVivienda: text(),
    telefonoDuenoVivienda: text(),
    contruccionVivienda: text(),
    idCliente: int(),
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.idCliente),
    };
  }
);

export const verificacionResultTable = sqliteTable("verificacion_result", {
  vrId: int().primaryKey({ autoIncrement: true }),
  vrComentario: text(),
  vdId: int(),
  vtId: int(),
  clId: int(),
  usIdCobrador: int(),
  vrFechaVerificacion: text(),
  vrLatitud: integer({ mode: "number" }),
  vrLongitud: integer({ mode: "number" }),
  vrProcesado: int().default(0),
  pideActualizacion: int().default(0),
});

export const verificacionResultDetTable = sqliteTable("verificacion_result_det", {
  vcId: int().primaryKey({ autoIncrement: true }),
  vrId: int(),
  fecha: text(),
  vcImagenBase: text(),
  vcPeriodo: text(),
  nombre: text(),
  vrdProcesado: int().default(0),
});

export const tiposVerificacionTable = sqliteTable("tipos_verificacion", {
  vtId: int(),
  vtDescripcion: text(),
});

export const gestionesTable = sqliteTable(
  "gestiones",
  {
    idHojaRuta: int(),
    usuId: int(),
    clId: int(),
    nombreCliente: text(),
    gestionado: int().default(0),
    tcId: int(), // igual al teId del tipo de gestiones, ya que aca solo se llama asi
  },
  (table) => {
    return {
      uniqueConstraint: unique().on(table.idHojaRuta, table.clId),
    };
  }
);

export const gestionesDetallesTable = sqliteTable("gestiones_detalles", {
  gcId: int(),
  caId: int(),
  crId: int(),
  idAgencia: int(),
  idHojaDetalle: int(),
});

export const referenciasTable = sqliteTable("referencias", {
  clId: int(),
  peIdReferencia: int(),
  identificacionReferencia: text(),
  idTipoReferencia: int(),
  tipoReferencia: text(),
  apellidosReferencia: text(),
  nombresReferencia: text(),
  actividadEconomicaReferencia: text(),
  empresaReferencia: text(),
  cargoReferencia: text(),
  rucEmpresaReferencia: text(),
  telfCelularReferencia: text(),
  telfTrabajoReferencia: text(),
  telfCasaReferencia: text(),
});

export const documentosTable = sqliteTable("documentos", {
  idFactura: int(),
  fechaFactura: text(),
  tipoComprobante: text(),
  idCredito: int(),
  nroCuotas: int(),
  valorCuota: integer({ mode: "number" }),
  valorTotalCredito: integer({ mode: "number" }),
  crSaldoCapital: integer({ mode: "number" }),
  crSaldoInteres: integer({ mode: "number" }),
  crSaldoCredito: integer({ mode: "number" }),
  interesGastoMora: integer({ mode: "number" }),
  interesGastoCobranza: integer({ mode: "number" }),
  cuotasPagadas: int(),
  cuotasPorPagar: int(),
  clId: int(),
});

export const documentosDetTable = sqliteTable("documentos_det", {
  idArticulo: int(),
  nombreArticulo: text(),
  crId: int(),
});

export const gestionesAnterioresTable = sqliteTable("gestiones_anteriores", {
  gcId: int(),
  idCliente: int(),
  nombreCliente: text(),
  codComprobanteStock: text(),
  idCredito: int(),
  idFactura: int(),
  nombreGestiona: text(),
  fechaGestionado: text(),
  fechaProxGestion: text(),
  geObservacion: text(),
  estadoGestion: int(),
});

export const tiposGestionesCabeceraTable = sqliteTable("tipos_gestiones_cabecera", {
  gcId: int(),
  gcDescripcion: text(),
  teId: int(),
});

export const tiposGestionesDetallesTable = sqliteTable("tipos_gestiones_detalles", {
  gdId: int(),
  gdDescripcion: text(),
  gcId: int(),
  gfCompromisoPago: text(),
});

export const direccionesTable = sqliteTable("direcciones", {
  diId: int(),
  peId: int(),
  diDireccion: text(),
  diReferencia: text(),
  idTipoVivienda: int(),
  tipoVivienda: text(),
  diTrasversal: text(),
  diSector: text(),
  diNroCasa: text(),
  diLatitud: integer({ mode: "number" }),
  diLongitud: integer({ mode: "number" }),
  diPrincipal: text(),
  diCobranza: text(),
});

export const telefonosTable = sqliteTable("telefonos", {
  teId: int(),
  peId: int(),
  teTelefono: text(),
  idTipoTelefono: int(),
  tipoTelefono: text(),
  tePrincipal: text(),
});

export const tiposReferenciaTable = sqliteTable("tipos_referencia", {
  trId: int(),
  trReferencia: text(),
});

export const gestionesCobranzasResultados = sqliteTable("gestiones_cobranzas_resultados", {
  id: int("id").primaryKey({ autoIncrement: true }),
  gcIdCc: int(),
  gdId: int(),
  crLatitud: integer({ mode: "number" }),
  crLongitud: integer({ mode: "number" }),
  crObservaciones: text(),
  usIdGestiona: int(),
  crEstadoSync: text().default("PENDIENTE"),
  caId: int(),
  clId: int(),
  agId: int(),
  crIdCredito: int(),
  cpFechaCompromiso: text(),
  hrId: int(),
  cpObservaciones: text(),
  gcId: int(),
  crFechaProxGestion: text(),
  trId: int(),
  crFechaGestionada: text(),
  diId: int(),
  teId: int(),
});

export const formasPagoTable = sqliteTable("formas_pago", {
  fpId: int(),
  fpNombre: text(),
  fpSolicitaDetalle: text(),
});

export const pagosGestion = sqliteTable("pagos_gestion", {
  crId: int(),
  coId: int(),
  pgValorCobrado: integer({ mode: "number" }),
  usIdCobrador: int(),
  fpId: int(),
  pgFechaCobro: text(),
  pgObservaciones: text(),
  pgSincronizado: text().default("PENDIENTE"),
  pgLatitud: integer({ mode: "number" }),
  pgLongitud: integer({ mode: "number" }),
  gcId: int(),
  urlImg: text(),
  nombreImg: text(),
  caId: int(),
  hdId: int(),
});
