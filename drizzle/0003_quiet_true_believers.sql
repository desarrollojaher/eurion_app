CREATE TABLE `banco` (
	`codBanco` text,
	`nomBanco` text
);
--> statement-breakpoint
CREATE TABLE `formas_pago` (
	`codFormaPago` text,
	`nombre` text,
	`tipo` integer
);
--> statement-breakpoint
CREATE TABLE `tarjetas_credito` (
	`nomTarjeta` text,
	`codTarjeta` text,
	`codBanco` text
);
