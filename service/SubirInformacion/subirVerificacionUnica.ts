import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { ISincronizarVerificacionesEnviar } from "@/models/ISincronizar";
import { subirInformacionKeys } from "./subirInformacionKeys";
import { Toast } from "toastify-react-native";
import {
  compressImage,
  eliminarImagen,
} from "@/helper/function/comprimirImagen";
import { awsApi } from "@/api/aws";
import uuid from "react-native-uuid";
import { BucketS3Jaher } from "@/constants/env";
import { IImagenS3 } from "@/models/IImagenes";
import { sincronizacionApi } from "@/api/sincronizacion";

export const SubirVerificacionUnica = () => {
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

      const url = await awsApi.obtenerPath({ modulo: "VERIFICACIONES" });
      let urlS3 = "";
      if (url.length > 0) {
        urlS3 = url[0].path.replace("CEDULA", verificacion[0].clIdentificacion);
      }
      const imagenesS3: IImagenS3[] = [];
      for (let i = 0; i < verificacion.length; i++) {
        const key = uuid.v4();
        const img = verificacion[i];
        const compressed = await compressImage(img.vcImagenBase);

        const fileData = await fetch(compressed.uri).then((res) => res.blob());

        const presignal = await awsApi.generarPresignal({
          path: `${urlS3}/${key}`,
        });

        const response = await fetch(presignal.url, {
          method: "PUT",
          headers: {
            "Content-Type": fileData.type,
          },
          body: fileData,
        });

        if (response.ok) {
          imagenesS3.push({
            bucket: BucketS3Jaher,
            path: `${urlS3}`,
            key: key,
            mimetype: fileData.type,
          });
        } else {
          throw new Error("Error al subir imagen");
        }
      }

      verificacion[0].imagenes = imagenesS3;

      await sincronizacionApi.sincronizarVerificacionEnviar(verificacion[0]);

      await dbSqliteService.actualizarVerificacionesDetalles({
        vdId: verificacion[0].vrId ?? -1,
        estado: 1,
      });
      for (let i = 0; i < verificacion.length; i++) {
        await eliminarImagen(verificacion[i].vcImagenBase);
      }

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
