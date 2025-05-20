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
	`logitud` integer,
	`direccion` text
);
