CREATE TABLE `cliente_conyuge` (
	`identificacionCliente` text,
	`nombres` text,
	`identificacion` text,
	`apellidos` text,
	`ocupacionLaboral` text,
	`nombreEmpresa` text,
	`antiguedad` text,
	`cargo` text,
	`nombreJefe` text,
	`ingresos` integer,
	`telefonoEmpresa` text,
	`celularJefe` text,
	`direccionEmpresa` text,
	`referencias` text,
	`celularConyugue` text
);
--> statement-breakpoint
CREATE TABLE `clientes` (
	`identificacion` text,
	`nombres` text,
	`apellidos` text,
	`telefono` text,
	`email` text,
	`estadoCivil` text,
	`nroDependientes` integer,
	`ocupacionLaboral` text,
	`nombreEmpresa` text,
	`antiguedad` text,
	`cargo` text,
	`nombreJefe` text,
	`ingresos` integer,
	`telefonoEmpresa` text,
	`celularJefe` text,
	`direccionEmpresa` text,
	`referencias` text,
	`observacion` text,
	`cupoCredito` integer,
	`montoDisponible` integer,
	`chequesPendientes` integer,
	`productos` text,
	`score` integer,
	`categoria` text,
	`telefonoDuenoCasa` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clientes_identificacion_unique` ON `clientes` (`identificacion`);--> statement-breakpoint
CREATE UNIQUE INDEX `clientes_email_unique` ON `clientes` (`email`);--> statement-breakpoint
CREATE TABLE `direccion` (
	`codigo` text,
	`identificacionCliente` text,
	`direccion` text,
	`tipoVivienda` text,
	`nombreDueno` text,
	`latitud` integer,
	`longitud` integer,
	`observacionesAdicionales` text,
	`tipoRecidencia` text,
	`tipoConstruccion` text
);
--> statement-breakpoint
CREATE TABLE `foto_cliente` (
	`identificacionCliente` text,
	`fotoCliente` blob
);
--> statement-breakpoint
CREATE TABLE `foto_del_domicilio` (
	`identificacionCliente` text,
	`fotoDelDomicilio` blob
);
--> statement-breakpoint
CREATE TABLE `imagen_verificacion` (
	`id` integer,
	`idVerificacion` integer,
	`nombre` text,
	`imagen` blob
);
--> statement-breakpoint
CREATE TABLE `verificaciones_resultado` (
	`id` integer,
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
CREATE TABLE `verificaciones` (
	`fecha` text,
	`identificacionCliente` text,
	`codigoDireccion` text,
	`codigoZona` text,
	`identificacionAgente` text,
	`codigoTipoRuta` integer,
	`esVerificado` integer
);
--> statement-breakpoint
CREATE TABLE `zona` (
	`codigo` text,
	`nombres` text
);
