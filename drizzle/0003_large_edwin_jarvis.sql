CREATE TABLE `pagos_gestion` (
	`coId` integer,
	`pgValorCobrado` integer,
	`usIdCobrador` integer,
	`fpId` integer,
	`pgFechaCobro` text,
	`pgObservaciones` text,
	`pgSincronizado` text DEFAULT 'PENDIENTE',
	`pgLatitud` integer,
	`pgLongitud` integer,
	`gcId` integer,
	`urlImg` text,
	`nombreImg` text
);
