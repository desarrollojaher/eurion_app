DROP INDEX `cliente_idCliente_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `cliente_idCliente_tdId_unique` ON `cliente` (`idCliente`,`tdId`);--> statement-breakpoint
ALTER TABLE `verificacion` ADD `tdId` integer;