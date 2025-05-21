CREATE TABLE `bitacora_sincronizado` (
	`codigo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fecha` text
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
CREATE TABLE `detalle_garante_gcobranza` (
	`identificacionCliente` text,
	`nroDocumento` text,
	`producto` text
);
--> statement-breakpoint
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
ALTER TABLE `clientes` ADD `tipo` integer;--> statement-breakpoint
ALTER TABLE `direccion` ADD `tipo` integer;