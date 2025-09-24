CREATE TABLE `bitacora_sincronizado` (
	`codigo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fecha` text,
	`sincronizado` integer DEFAULT 0,
	`idCobrador` integer
);
--> statement-breakpoint
CREATE TABLE `cliente` (
	`idCliente` integer,
	`personaId` integer,
	`direccionCliente` text,
	`identificacionCliente` text,
	`nombreCliente` text,
	`apellidoCliente` text,
	`estadoCivilCliente` text,
	`dependientesCliente` integer,
	`referencias` text,
	`observaciones` text,
	`categoriaCliente` text,
	`scoreCliente` text,
	`ocupacionLaboralCliente` text,
	`empresaLaboraCliente` text,
	`antiguedadCliente` integer,
	`cargoCliente` text,
	`nombreJefeCliente` text,
	`ingresosCliente` integer,
	`telefonoEmpresaCliente` text,
	`celJefeCliente` text,
	`direccionTrabajoCliente` text,
	`fotoCliente` text,
	`fotoDireccion` text,
	`telefonoCliente` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cliente_idCliente_unique` ON `cliente` (`idCliente`);--> statement-breakpoint
CREATE TABLE `conyugue` (
	`identificacionConyugue` text,
	`nombresConyugue` text,
	`apellidosConyugue` text,
	`telefonoConyugue` text,
	`ocupacionLaboralConyugue` text,
	`empresaLaboraConyugue` text,
	`antiguedadConyugue` text,
	`cargoConyugue` text,
	`telefonoEmpresaConyugue` text,
	`celJefeConyugue` text,
	`direccionTrabajoConyugue` text,
	`idCliente` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `conyugue_idCliente_unique` ON `conyugue` (`idCliente`);--> statement-breakpoint
CREATE TABLE `direcciones` (
	`diId` integer,
	`peId` integer,
	`diDireccion` text,
	`diReferencia` text,
	`idTipoVivienda` integer,
	`tipoVivienda` text,
	`diTrasversal` text,
	`diSector` text,
	`diNroCasa` text,
	`diLatitud` integer,
	`diLongitud` integer,
	`diPrincipal` text,
	`diCobranza` text
);
--> statement-breakpoint
CREATE TABLE `documentos_det` (
	`idArticulo` integer,
	`nombreArticulo` text
);
--> statement-breakpoint
CREATE TABLE `documentos` (
	`idFactura` integer,
	`fechaFactura` text,
	`tipoComprobante` text,
	`idCredito` integer,
	`nroCuotas` integer,
	`valorCuota` integer,
	`valorTotalCredito` integer,
	`crSaldoCapital` integer,
	`crSaldoInteres` integer,
	`crSaldoCredito` integer,
	`interesGastoMora` integer,
	`interesGastoCobranza` integer,
	`cuotasPagadas` integer,
	`cuotasPorPagar` integer,
	`clId` integer
);
--> statement-breakpoint
CREATE TABLE `gestiones_anteriores` (
	`gcId` integer,
	`idCliente` integer,
	`nombreCliente` text,
	`codComprobanteStock` text,
	`idCredito` integer,
	`idFactura` integer,
	`nombreGestiona` text,
	`fechaGestionado` text,
	`fechaProxGestion` text,
	`geObservacion` text,
	`estadoGestion` integer
);
--> statement-breakpoint
CREATE TABLE `gestiones_cobranzas_resultados` (
	`gcIdCc` integer,
	`gdId` integer,
	`crLatitud` integer,
	`crLongitud` integer,
	`crObservaciones` text,
	`usIdGestiona` integer,
	`crEstadoSync` text DEFAULT 'PENDIENTE',
	`caId` integer,
	`clId` integer,
	`agId` integer,
	`crIdCredito` integer,
	`cpFechaCompromiso` text,
	`hdId` integer,
	`cpObservaciones` text,
	`gcId` integer,
	`crFechaProxGestion` text,
	`trId` integer
);
--> statement-breakpoint
CREATE TABLE `gestiones_detalles` (
	`gcId` integer,
	`caId` integer,
	`crId` integer
);
--> statement-breakpoint
CREATE TABLE `gestiones` (
	`idHojaRuta` integer,
	`usuId` integer,
	`clId` integer,
	`nombreCliente` text,
	`gestionado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gestiones_clId_unique` ON `gestiones` (`clId`);--> statement-breakpoint
CREATE TABLE `referencias` (
	`clId` integer,
	`peIdReferencia` integer,
	`identificacionReferencia` text,
	`idTipoReferencia` integer,
	`tipoReferencia` text,
	`apellidosReferencia` text,
	`nombresReferencia` text,
	`actividadEconomicaReferencia` text,
	`empresaReferencia` text,
	`cargoReferencia` text,
	`rucEmpresaReferencia` text,
	`telfCelularReferencia` text,
	`telfTrabajoReferencia` text,
	`telfCasaReferencia` text
);
--> statement-breakpoint
CREATE TABLE `telefonos` (
	`teId` integer,
	`peId` integer,
	`teTelefono` text,
	`idTipoTelefono` integer,
	`tipoTelefono` text,
	`tePrincipal` text
);
--> statement-breakpoint
CREATE TABLE `tipos_gestiones_cabecera` (
	`gcId` integer,
	`gcDescripcion` text
);
--> statement-breakpoint
CREATE TABLE `tipos_gestiones_detalles` (
	`gdId` integer,
	`gdDescripcion` text,
	`gcId` integer,
	`gfCompromisoPago` text
);
--> statement-breakpoint
CREATE TABLE `tipos_referencia` (
	`trId` integer,
	`trReferencia` text
);
--> statement-breakpoint
CREATE TABLE `tipos_verificacion` (
	`vtId` integer,
	`vtDescripcion` text
);
--> statement-breakpoint
CREATE TABLE `verificacion_result_det` (
	`vcId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vrId` integer,
	`fecha` text,
	`vcImagenBase` text,
	`vcPeriodo` text,
	`nombre` text,
	`vrdProcesado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `verificacion_result` (
	`vrId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vrComentario` text,
	`vdId` integer,
	`vtId` integer,
	`clId` integer,
	`usIdCobrador` integer,
	`vrFechaVerificacion` text,
	`vrLatitud` integer,
	`vrLongitud` integer,
	`vrProcesado` integer DEFAULT 0,
	`pideActualizacion` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `verificacion` (
	`idVerificacion` integer,
	`idCliente` integer,
	`fechaVerificacion` text,
	`latitudCliente` integer,
	`longitudCliente` integer,
	`tipoVerificacion` text,
	`identificacionCobrador` integer,
	`periodo` text,
	`producto` text,
	`procesado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verificacion_idVerificacion_idCliente_periodo_tipoVerificacion_unique` ON `verificacion` (`idVerificacion`,`idCliente`,`periodo`,`tipoVerificacion`);--> statement-breakpoint
CREATE TABLE `vivienda` (
	`tipoVivienda` text,
	`nombreDuenoVivienda` text,
	`telefonoDuenoVivienda` text,
	`contruccionVivienda` text,
	`idCliente` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vivienda_idCliente_unique` ON `vivienda` (`idCliente`);