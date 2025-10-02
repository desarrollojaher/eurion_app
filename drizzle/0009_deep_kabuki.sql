ALTER TABLE `gestiones_cobranzas_resultados` RENAME COLUMN "hdId" TO "hrId";--> statement-breakpoint
ALTER TABLE `pagos_gestion` ADD `hdId` integer;