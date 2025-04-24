import { create } from "zustand";
import {
  IVerificacionDetalle,
  IVerificacionPruebaCabecera,
} from "@/models/IVerificacionPrueba";
import { find } from "lodash";
import { detallesVerificacionPrueba } from "../json/jsonCabeceraVerificacion";

type IVerificacionStore = {
  datos: IVerificacionPruebaCabecera | null;
  datosDetalles: IVerificacionDetalle | null;
  eliminar: () => void;
  setDatos: (dato: IVerificacionPruebaCabecera) => void;
  setDatosDetalles: () => void;
};

export const useVerificacionStore = create<IVerificacionStore>()(
  (set, get) => ({
    datos: null,
    datosDetalles: null,
    eliminar: () => set(() => ({ datos: null })),
    setDatos: (dato: IVerificacionPruebaCabecera) =>
      set(() => ({ datos: dato })),
    setDatosDetalles: () => {
      const { datos } = get();
      if (datos) {
        const datosDetalles = find(
          detallesVerificacionPrueba,
          (item) => item.datosGenerales.cedulaCliente === datos.cedulaCliente
        );

        set(() => ({
          datosDetalles,
        }));
      }
    },
  })
);
