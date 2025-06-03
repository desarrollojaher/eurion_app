CREATE TABLE `telefonos_actualizar` (
	`identificacionCliente` text,
	`telefono` text,
	`tipoTelefono` text,
	`sincronizado` integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE `gestiones_celular_gcobranza` ADD `tipoReferencia` text DEFAULT '';