PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_gestiones_celular_gcobranza` (
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
INSERT INTO `__new_gestiones_celular_gcobranza`("nroDocumento", "fechaGestion", "observaciones", "codigoTipoGestion", "identificacionCliente", "fechaProximaGestion", "observacionesProximaGestion", "codigoTipoGestionProxima", "latitud", "longitud", "sincronizado") SELECT "nroDocumento", "fechaGestion", "observaciones", "codigoTipoGestion", "identificacionCliente", "fechaProximaGestion", "observacionesProximaGestion", "codigoTipoGestionProxima", "latitud", "longitud", "sincronizado" FROM `gestiones_celular_gcobranza`;--> statement-breakpoint
DROP TABLE `gestiones_celular_gcobranza`;--> statement-breakpoint
ALTER TABLE `__new_gestiones_celular_gcobranza` RENAME TO `gestiones_celular_gcobranza`;--> statement-breakpoint
PRAGMA foreign_keys=ON;