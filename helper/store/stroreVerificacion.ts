import { create } from "zustand";
import { IVerificacionesCabecera } from "@/models/IVerificaciones";

type IVerificacionStore = {
  datos: IVerificacionesCabecera | null;
  eliminar: () => void;
  setDatos: (dato: IVerificacionesCabecera) => void;
};

export const useVerificacionStore = create<IVerificacionStore>()(
  (set, get) => ({
    datos: null,
    eliminar: () => set(() => ({ datos: null })),
    setDatos: (dato: IVerificacionesCabecera) => set(() => ({ datos: dato })),
  })
);
