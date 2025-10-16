DROP INDEX `gestiones_clId_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `gestiones_idHojaRuta_clId_unique` ON `gestiones` (`idHojaRuta`,`clId`);