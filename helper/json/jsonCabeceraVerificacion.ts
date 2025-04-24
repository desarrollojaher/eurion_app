import {
  IVerificacionDetalle,
  IVerificacionPruebaCabecera,
} from "@/models/IVerificacionPrueba";

export const cabeceraVerificacionPrueba: IVerificacionPruebaCabecera[] = [
  {
    tipoVerificacion: "VERIFICACION DOMICILIO",
    fechaVerificacion: "20-04-2025",
    nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
    cedulaCliente: "092037160-6",
    telefonoCliente: "0987654321",
    direccionCliente:
      "TRONCAL RCTO SAN CARLOS 01 AV PRINCIPAL LA INDIANA ANTES DE LA T A L DERECHA CASA DE DOS PISOS  DE LADRILLO",
    imagenes: [
      {
        titulo: "imagen1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
      },
      {
        titulo: "imagen2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
      },
    ],
  },
  {
    tipoVerificacion: "VERIFICACION TRABAJO",
    fechaVerificacion: "20-04-2025",
    nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
    cedulaCliente: "092037160-6",
    telefonoCliente: "0987654321",
    direccionCliente: "TRONCAL RCTO SAN CARLOS ",
    imagenes: [
      {
        titulo: "imagen1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
      },
      {
        titulo: "imagen2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
      },
    ],
  },
  {
    tipoVerificacion: "VERIFICACION DOMICILIO",
    fechaVerificacion: "20-04-2025",
    nombreCliente: "MACIAS SACON LUIS EVARISPO PT UA-01575",
    cedulaCliente: "131062280-6",
    telefonoCliente: "0987654321",
    direccionCliente:
      "TRONCAL RCTO SAN CARLOS 01 LA COMPUERTA ATRAS DEL BAR DESCANSO MAS ADELANTE IGLESIA CASA DE CEMENTO",
    imagenes: [
      {
        titulo: "imagen1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
      },
      {
        titulo: "imagen2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
      },
    ],
  },
  {
    tipoVerificacion: "VERIFICACION TRABAJO",
    fechaVerificacion: "20-04-2025",
    nombreCliente: "MACIAS SACON LUIS EVARISPO PT UA-01575",
    cedulaCliente: "131062280-6",
    telefonoCliente: "0987654321",
    direccionCliente: "",
    imagenes: [
      {
        titulo: "imagen1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
      },
      {
        titulo: "imagen2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
      },
    ],
  },
];

export const detallesVerificacionPrueba: IVerificacionDetalle[] = [
  {
    buro: {
      categoria: "RVIP",
      score: 898,
      producto:
        "ACEITE SHINERAY MOORCYCLE 4T III  CASCO TECH HELMES T30 ABATIBLE III MOTOCCETA SHINERAY XY150-15 SARK (2025) III PROMOCIONAL IMPERMEABLE III KIT PREMIUM 150-15 GN-STARK 2DA GENERACION",
    },
    datosGenerales: {
      cedulaCliente: "092037160-6",
      nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
      estadoCivil: "SOLTERO",
      dependientes: 0,
      telefono: "099880412",
      observacion:
        "COMERCINATE / PAGOS PUNTUTALES POR SALIR DE UN CREDITO / DOMICILIO CON ESTABILIDAD FAMILIAR ",
      referencias:
        "GUTAMA MARIO 0998801412 072420298 SAN CARLOS GUTAMA EVA 0958993962 072420298 SAB CARLOS / SUSTENTO AGRICULTOR",
    },
    datosVivienda: {
      construccion: "",
      direccion:
        "TRONCAL RCTO SAN CARLOS 01 AV PRINCIPAL LA INDIANA ANTES DE LA T A L DERECHA CASA DE DOS PISOS  DE LADRILLO",
      nombrePropietario: "ROSENDO DAVID GUTAMA GUTAMA",
      telefonoPropietario: "",
      tipoVivienda: "FAMILIAR",
      zona: "TRONCAL ZONA 1",
    },
  },

  {
    buro: {
      categoria: "BOK",
      score: 807,
      producto:
        "CELULAR INFINIX NOTE 40 PRO X6850 8+8RAM 256GB ||| DESGRAVAMEN ||| DESEMPLEO ||| GARANTIA 1 AÑO MAS GARANIA ||| INTERES POR VENTA A CREDITO",
    },
    datosGenerales: {
      cedulaCliente: "131062280-6",
      nombreCliente: "MACIAS SACON LUIS EVARISPO PT UA-01575",
      estadoCivil: "SOLTERO",
      dependientes: 0,
      telefono: "0996940111",
      observacion:
        "CLIENTE CON HISTORIAL DE CREDITO BUENO / PAGOS PUNTUALES / DOMICILIO CON ESTABILIDAD FAMILIAR",
      referencias:
        "SACON VIGINIA 00960970495 072420298 SAB CARLOS ||| GARCIA BYRON 0984933161 072420298",
    },
    datosVivienda: {
      construccion: "",
      direccion:
        "TRONCAL RCTO SAN CARLOS 01 VIA LA COMPUERTA ATRAS DEL BAR DESCANSO MAS ADELANTE IGLESIA CASA DE CEMENTO",
      nombrePropietario: "FAMILIAR",
      telefonoPropietario: "",
      tipoVivienda: "FAMILIAR",
      zona: "TRONCAL ZONA 1",
    },
  },
];
