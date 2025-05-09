PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_imagen_verificacion` (
	`id` text,
	`idVerificacion` text,
	`nombre` text,
	`imagen` text
);
--> statement-breakpoint
INSERT INTO `__new_imagen_verificacion`("id", "idVerificacion", "nombre", "imagen") SELECT "id", "idVerificacion", "nombre", "imagen" FROM `imagen_verificacion`;--> statement-breakpoint
DROP TABLE `imagen_verificacion`;--> statement-breakpoint
ALTER TABLE `__new_imagen_verificacion` RENAME TO `imagen_verificacion`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_verificaciones_resultado` (
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
	`codigoTipoRuta` integer
);
--> statement-breakpoint
INSERT INTO `__new_verificaciones_resultado`("id", "fecha", "observaciones", "codigoTipoGestion", "verificacion", "identificacionCliente", "identificacionAgente", "codigoDireccion", "latitud", "longitud", "codigoTipoRuta") SELECT "id", "fecha", "observaciones", "codigoTipoGestion", "verificacion", "identificacionCliente", "identificacionAgente", "codigoDireccion", "latitud", "longitud", "codigoTipoRuta" FROM `verificaciones_resultado`;--> statement-breakpoint
DROP TABLE `verificaciones_resultado`;--> statement-breakpoint
ALTER TABLE `__new_verificaciones_resultado` RENAME TO `verificaciones_resultado`;