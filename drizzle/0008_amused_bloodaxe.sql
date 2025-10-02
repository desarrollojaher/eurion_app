PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_gestiones_cobranzas_resultados` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
	`trId` integer,
	`crFechaGestionada` text,
	`diId` integer,
	`teId` integer
);
--> statement-breakpoint
INSERT INTO `__new_gestiones_cobranzas_resultados`("id", "gcIdCc", "gdId", "crLatitud", "crLongitud", "crObservaciones", "usIdGestiona", "crEstadoSync", "caId", "clId", "agId", "crIdCredito", "cpFechaCompromiso", "hdId", "cpObservaciones", "gcId", "crFechaProxGestion", "trId", "crFechaGestionada", "diId", "teId") SELECT "id", "gcIdCc", "gdId", "crLatitud", "crLongitud", "crObservaciones", "usIdGestiona", "crEstadoSync", "caId", "clId", "agId", "crIdCredito", "cpFechaCompromiso", "hdId", "cpObservaciones", "gcId", "crFechaProxGestion", "trId", "crFechaGestionada", "diId", "teId" FROM `gestiones_cobranzas_resultados`;--> statement-breakpoint
DROP TABLE `gestiones_cobranzas_resultados`;--> statement-breakpoint
ALTER TABLE `__new_gestiones_cobranzas_resultados` RENAME TO `gestiones_cobranzas_resultados`;--> statement-breakpoint
PRAGMA foreign_keys=ON;