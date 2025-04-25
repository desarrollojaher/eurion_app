import { IDatosSelect } from "@/components/commons/select/Select";
import { IGstionesPrueba } from "@/models/IGestionesPrueba";

export const jsonGestiones: IGstionesPrueba[] = [
  {
    cedulaCliente: "120340539-2",
    nombreCliente: "BANCHON RAMOS AMELIA INES",
    direccionCliente:
      "01 LA TRONCAL CDLA FLOR DE BOSQUE 01 AV PRINCIPAL ENTRANDO POR LA CARRETA 3 CUADRAS MANO IZQUIERDA CASA DE 1 COLOR CREMA PORTON NEGRO",
    deudaTotal: "267.37",
    vencimineto: "228.36",
    tramo: "SIN TRAMO",
    zona: "TRONCAL ZONA 1",
    posicion: {
      latitud: -0.123456,
      longitud: -78.123456,
    },
    imagenes: [
      {
        titulo: "1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLu2IRGbN9vcKiZG_99gK-a5uZHaHQ1yJPGQ&s",
      },
      {
        titulo: "2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsp4EhytGgNklHp-2FbxTdu1Uso04dndlTdw&s",
      },
    ],
  },

  {
    cedulaCliente: "131432936-6",
    nombreCliente: "CAICEDO MANZABA JORDY VALENTIN",
    direccionCliente:
      "01 RCTO SAN EDUARDO 01 VIA PLAYA SECA LLEGANDO A PLAYA SECA PASAND EL PUENTE DE PLAYA SECA CDLA SAN EDUARDO CASA DE 1 PISO MADERA",
    deudaTotal: "3718.66",
    vencimineto: "278.98",
    tramo: "SIN TRAMO",
    zona: "TRONCAL ZONA 1",
    posicion: {
      latitud: -0.123456,
      longitud: -78.123456,
    },
    imagenes: [
      {
        titulo: "1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLu2IRGbN9vcKiZG_99gK-a5uZHaHQ1yJPGQ&s",
      },
      {
        titulo: "2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsp4EhytGgNklHp-2FbxTdu1Uso04dndlTdw&s",
      },
    ],
  },

  {
    cedulaCliente: "172995387-5",
    nombreCliente: "CALDERON REYES ANTHONY EDINSON",
    direccionCliente:
      "RCTO PAYO CHICO EL TRIUNFO RCTO PAYO CHICO 01 AV PRINCIPAL N LA SEUNDA ENTREDA DEL CEMENTERIO INGRESANDO POR EL BILLAR LARGO PRIMER CASA COLOR BLANCA",
    deudaTotal: "3387.05",
    vencimineto: "305.76",
    tramo: "SIN TRAMO",
    zona: "TRONCAL ZONA 1",
    posicion: {
      latitud: -0.123456,
      longitud: -78.123456,
    },
    imagenes: [
      {
        titulo: "1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLu2IRGbN9vcKiZG_99gK-a5uZHaHQ1yJPGQ&s",
      },
      {
        titulo: "2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsp4EhytGgNklHp-2FbxTdu1Uso04dndlTdw&s",
      },
    ],
  },
];

// filtros
export const zonas: IDatosSelect[] = [
  {
    label: "Todos",
    value: "todos",
  },
  {
    label: "zona 1",
    value: "zona1",
  },
];

//filtro de tipos  de gestion se debe pasar por endpoint
export const tiposGestion: IDatosSelect[] = [
  {
    label: "COB-REBATE",
    value: "cob-rebate",
  },
  {
    label: "COB-NEGATIVA DE PAGO",
    value: "cob-negativa-pago",
  },
];



