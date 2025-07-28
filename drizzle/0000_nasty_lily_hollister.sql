CREATE TABLE `bitacora_sincronizado` (
	`codigo` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fecha` text
);
--> statement-breakpoint
CREATE TABLE `cliente` (
	`idCliente` integer,
	`direccionCliente` text,
	`identificacionCliente` text,
	`nombreCliente` text,
	`apellidoCliente` text,
	`estadoCivilCliente` text,
	`didependientesCliente` integer,
	`referencias` text,
	`observaciones` text,
	`categoriaCliente` text,
	`scoreCliente` integer,
	`ocupacionLaboralCliente` text,
	`empresaLaboraCliente` text,
	`antiguedadCliente` text,
	`cargoCliente` text,
	`nombreJefeCliente` text,
	`ingresosCliente` integer,
	`telefonoEmpresaCliente` text,
	`celJefeCliente` text,
	`direccionTrabajoCliente` text,
	`fotoCliente` text,
	`fotoDireccion` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cliente_idCliente_unique` ON `cliente` (`idCliente`);--> statement-breakpoint
CREATE TABLE `conyugue` (
	`identificacionConyugue` text,
	`nombresConyugue` text,
	`apellidosConyugue` text,
	`telefonoConyugue` text,
	`ocupacionLaboralConyugue` text,
	`empresaLaboraConyugue` text,
	`antiguedadConyugue` text,
	`cargoConyugue` text,
	`telefonoEmpresaConyugue` text,
	`celJefeConyugue` text,
	`direccionTrabajoConyugue` text,
	`idCliente` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `conyugue_idCliente_unique` ON `conyugue` (`idCliente`);--> statement-breakpoint
CREATE TABLE `verificacion_result_det` (
	`vcId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vrId` integer,
	`vcImagenBase` text,
	`vcPeriodo` text,
	`vrdProcesado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `verificacion_result` (
	`vrId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vrComentario` text,
	`vdId` integer,
	`vtId` integer,
	`clId` integer,
	`usIdCobrador` integer,
	`vrFechaVerificacion` text,
	`vrLatitud` integer,
	`vrLongitud` integer,
	`vrProcesado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `verificacion` (
	`idVerificacion` integer,
	`idCliente` integer,
	`fechaVerificacion` text,
	`latitudCliente` integer,
	`longitudCliente` integer,
	`tipoVerificacion` text,
	`identificacionCobrador` integer,
	`periodo` text,
	`producto` text,
	`procesado` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verificacion_idVerificacion_idCliente_periodo_tipoVerificacion_unique` ON `verificacion` (`idVerificacion`,`idCliente`,`periodo`,`tipoVerificacion`);--> statement-breakpoint
CREATE TABLE `vivienda` (
	`tipoVivienda` integer,
	`nombreDuenoVivienda` text,
	`telefonoDuenoVivienda` text,
	`contruccionVivienda` text,
	`idCliente` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vivienda_idCliente_unique` ON `vivienda` (`idCliente`);