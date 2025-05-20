PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_foto_cliente` (
	`identificacionCliente` text,
	`fotoCliente` text
);
--> statement-breakpoint
INSERT INTO `__new_foto_cliente`("identificacionCliente", "fotoCliente") SELECT "identificacionCliente", "fotoCliente" FROM `foto_cliente`;--> statement-breakpoint
DROP TABLE `foto_cliente`;--> statement-breakpoint
ALTER TABLE `__new_foto_cliente` RENAME TO `foto_cliente`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_foto_del_domicilio` (
	`identificacionCliente` text,
	`fotoDelDomicilio` text
);
--> statement-breakpoint
INSERT INTO `__new_foto_del_domicilio`("identificacionCliente", "fotoDelDomicilio") SELECT "identificacionCliente", "fotoDelDomicilio" FROM `foto_del_domicilio`;--> statement-breakpoint
DROP TABLE `foto_del_domicilio`;--> statement-breakpoint
ALTER TABLE `__new_foto_del_domicilio` RENAME TO `foto_del_domicilio`;