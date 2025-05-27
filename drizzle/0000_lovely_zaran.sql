CREATE TABLE `bitacora_sincronizado` (
	`codigo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fecha` text
);
--> statement-breakpoint
CREATE TABLE `cliente_conyuge` (
	`identificacionCliente` text,
	`nombres` text,
	`identificacion` text,
	`apellidos` text,
	`ocupacionLaboral` text,
	`nombreEmpresa` text,
	`antiguedad` text,
	`cargo` text,
	`nombreJefe` text,
	`ingresos` integer,
	`telefonoEmpresa` text,
	`celularJefe` text,
	`direccionEmpresa` text,
	`referencias` text,
	`celularConyugue` text
);
--> statement-breakpoint
CREATE TABLE `cliente_garante_gcobranza` (
	`identificacion` text,
	`identificacionCliente` text,
	`nombre` text,
	`telefono` text,
	`direccion` text,
	`detalleDireccion` text,
	`trabajaEn` text,
	`direccionTrabajo` text,
	`telefonoTrabajo` text,
	`celular` text
);
--> statement-breakpoint
CREATE TABLE `clientes` (
	`identificacion` text,
	`nombres` text,
	`apellidos` text,
	`telefono` text,
	`email` text,
	`estadoCivil` text,
	`nroDependientes` integer,
	`ocupacionLaboral` text,
	`nombreEmpresa` text,
	`antiguedad` text,
	`cargo` text,
	`nombreJefe` text,
	`ingresos` integer,
	`telefonoEmpresa` text,
	`celularJefe` text,
	`direccionEmpresa` text,
	`referencias` text,
	`observacion` text,
	`cupoCredito` integer,
	`montoDisponible` integer,
	`chequesPendientes` integer,
	`productos` text,
	`score` integer,
	`categoria` text,
	`telefonoDuenoCasa` text,
	`tipo` integer
);
--> statement-breakpoint
CREATE TABLE `detalle_garante_gcobranza` (
	`identificacionCliente` text,
	`nroDocumento` text,
	`producto` text
);
--> statement-breakpoint
CREATE TABLE `direccion_celular_gcobranza` (
	`identificacionCliente` text,
	`direccionIngresada` text,
	`indicacionesAdicionales` text,
	`latitud` integer,
	`longitud` integer,
	`nroDocumento` text,
	`fecha` text,
	`sincronizado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `direccion` (
	`codigo` text,
	`identificacionCliente` text,
	`direccion` text,
	`tipoVivienda` text,
	`nombreDueno` text,
	`latitud` integer,
	`longitud` integer,
	`observacionesAdicionales` text,
	`tipoResidencia` text,
	`tipoConstruccion` text,
	`tipo` integer
);
--> statement-breakpoint
CREATE TABLE `documentos_gcobranza` (
	`identificacionCliente` text,
	`numeroDePagos` integer,
	`monto` integer,
	`montoCancelado` integer,
	`fechaEmision` text,
	`fechaVencimiento` text,
	`nroDocumento` text,
	`interesMora` integer,
	`tramo` text,
	`gastosDeCobranza` integer,
	`valorTotalVencido` integer,
	`deudaTotal` integer,
	`cuotasPagadas` text,
	`cuotasPendientes` text,
	`fechaUltimoPago` text,
	`totalPendiente` integer,
	`saldoVencido` integer,
	`estado` integer,
	`saldoDelCredito` integer,
	`valorCuota` integer
);
--> statement-breakpoint
CREATE TABLE `enviar_gcobranza_celular` (
	`nroDocumento` text,
	`identificacionCliente` text,
	`codigoCargo` integer,
	`fecha` text,
	`periodo` integer,
	`codigoZona` text,
	`esGestionado` integer,
	`nombreCliente` text,
	`apellidoCliente` text,
	`observaciones` text,
	`latitud` integer,
	`longitud` integer,
	`direccion` text
);
--> statement-breakpoint
CREATE TABLE `foto_cliente` (
	`identificacionCliente` text,
	`fotoCliente` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `foto_cliente_identificacionCliente_unique` ON `foto_cliente` (`identificacionCliente`);--> statement-breakpoint
CREATE TABLE `foto_del_domicilio` (
	`identificacionCliente` text,
	`fotoDelDomicilio` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `foto_del_domicilio_identificacionCliente_unique` ON `foto_del_domicilio` (`identificacionCliente`);--> statement-breakpoint
CREATE TABLE `gestiones_celular_gcobranza` (
	`nroDocumento` text,
	`fechaGestion` text,
	`observaciones` text,
	`codigoTipoGestion` text,
	`identificacionCliente` text,
	`fechaProximaGestion` text,
	`observacionesProximaGestion` text,
	`codigoTipoGestionProxima` text,
	`latitud` integer,
	`longitud` integer,
	`sincronizado` integer
);
--> statement-breakpoint
CREATE TABLE `imagen_verificacion` (
	`id` text,
	`idVerificacion` text,
	`nombre` text,
	`imagen` text,
	`sincronizado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `tipo_de_gestion_gcobranza` (
	`codigo` text,
	`descripcion` text,
	`pideFoto` integer,
	`pideFecha` integer
);
--> statement-breakpoint
CREATE TABLE `usuario` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `usuario_email_unique` ON `usuario` (`email`);--> statement-breakpoint
CREATE TABLE `verificaciones_resultado` (
	`id` text,
	`fecha` text,
	`observaciones` text,
	`codigoTipoGestion` integer,
	`verificacion` integer,
	`identificacionCliente` text,
	`identificacionAgente` text,
	`codigoDireccion` text,
	`latitud` integer,
	`longitud` integer,
	`codigoTipoRuta` integer,
	`sincronizado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `verificaciones` (
	`fecha` text,
	`identificacionCliente` text,
	`codigoDireccion` text,
	`codigoZona` text,
	`identificacionAgente` text,
	`codigoTipoRuta` integer,
	`esVerificado` integer,
	`sincronizado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verificaciones_identificacionCliente_codigoTipoRuta_unique` ON `verificaciones` (`identificacionCliente`,`codigoTipoRuta`);--> statement-breakpoint
CREATE TABLE `zona` (
	`codigo` text,
	`nombres` text
);
