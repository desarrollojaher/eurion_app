import { IRecibo } from "@/models/IRecibo";

export const jsonRecibos: IRecibo[] = [
  {
    cedula: "030300351-1",
    nombre: "NOMBRE LEON MARIA JOSE",
    documentos: [
      {
        doctran: "A0UAX005856",
        fecha: "24-08-2024",
        deudaTotal: 3883.24,
        gastosPorCobranza: 36.0,
        interesMora: 2.48,
        saldoVencido: 232.95,
      },
    ],
    saldoTotal: "3883.24",
  },

  {
    cedula: "030237370-9",
    nombre: "CAMPUZANO VALENCIA WILLIANS REYNALDO",
    documentos: [
      {
        doctran: "A0UAX004853",
        fecha: "24-04-2023",
        deudaTotal: 2521.14,
        gastosPorCobranza: 36.0,
        interesMora: 9.86,
        saldoVencido: 543.56,
      },
      {
        doctran: "A0UAX004854",
        fecha: "24-04-2023",
        deudaTotal: 2521.14,
        gastosPorCobranza: 36.0,
        interesMora: 9.86,
        saldoVencido: 543.56,
      },
    ],
    saldoTotal: "5042.28",
  },
];
