import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { sincronizacionApi } from "@/api/sincronizacion";
import {
  ISincronizarVerificacionesEnviar,
  IVerificacionesEnviar,
} from "@/models/ISincronizar";
import { subirInformacionKeys } from "./subirInformacionKeys";
import { Toast } from "toastify-react-native";

export const subirVerificacionUnica = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sincronizado, setSincronizado] = useState(false);

  const queryClient = useQueryClient();

  const onCloseError = () => {
    setError(false);
  };

  const onCloseSincronizado = () => {
    setSincronizado(false);
  };

  const subirVerificacion = async (vdId: number, cerrarModal: () => void) => {
    try {
      setLoading(true);

      const verificacion: ISincronizarVerificacionesEnviar[] =
        await dbSqliteService.obtenerVerificacionesSubidaUnica({ vdId: vdId });

      const veriEnviar: IVerificacionesEnviar = {
        verificaciones: verificacion,
      };

      await sincronizacionApi.sincronizarVerificacionEnviar(veriEnviar);

      await dbSqliteService.actualizarVerificacionesDetalles({
        vdId: verificacion[0].vrId ?? -1,
        estado: 1,
      });

      queryClient.invalidateQueries({ queryKey: subirInformacionKeys.todos() });
      Toast.success("Verificacion subida");
      cerrarModal();
      setLoading(false);
      setSincronizado(true);
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.message === "Network Error") {
        setErrorMessage("No se pudo conectar con el servidor");
      } else {
        setErrorMessage(
          `Error en subir la verificacion:  ${error.response.data.message}`,
        );
      }
      setError(true);
      setLoading(false);
    }
  };

  return {
    loading,
    subirVerificacion,
    error,
    errorMessage,
    onCloseError,
    sincronizado,
    onCloseSincronizado,
  };
};
