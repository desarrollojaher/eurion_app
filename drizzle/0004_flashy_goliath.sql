PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_imagen_verificacion` (
	`id` integer,
	`idVerificacion` integer,
	`nombre` text,
	`imagen` text
);
--> statement-breakpoint
INSERT INTO `__new_imagen_verificacion`("id", "idVerificacion", "nombre", "imagen") SELECT "id", "idVerificacion", "nombre", "imagen" FROM `imagen_verificacion`;--> statement-breakpoint
DROP TABLE `imagen_verificacion`;--> statement-breakpoint
ALTER TABLE `__new_imagen_verificacion` RENAME TO `imagen_verificacion`;--> statement-breakpoint
PRAGMA foreign_keys=ON;