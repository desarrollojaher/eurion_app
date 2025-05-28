CREATE TABLE `cabecera_recibo_celular` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`identificacionCliente` text,
	`fecha` text,
	`observaciones` text,
	`total` integer,
	`totalInteresMora` integer,
	`totalGastoCobranza` integer,
	`latitud` integer,
	`longitud` integer,
	`nroDocumento` text,
	`codComprobanteCancela` text,
	`tipoComprobanteCancela` text,
	`cobroTotalCuotas` integer
);
--> statement-breakpoint
CREATE TABLE `detalle_recibo_celular` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`idCabeceraReciboCelular` integer,
	`codigoTipoPago` text,
	`valorTotal` integer,
	`codigoEmisor` text,
	`numeroCheque` text,
	`numeroCuenta` text,
	`numeroDocumento` text,
	`codigoBanco` text,
	`fechaVencimiento` text
);
--> statement-breakpoint
CREATE TABLE `imagenes_recibos` (
	`nroDocumento` text,
	`imagen` text,
	`titulo` text,
	`sincronizado` integer DEFAULT 0
);
