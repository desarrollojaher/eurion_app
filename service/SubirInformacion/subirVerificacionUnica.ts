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
import axios, { Axios } from "axios";

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

      for (let i = 0; i < verificacion.length; i++) {
        const img = verificacion[i];
        const compressed = await compressImage(img.vcImagenBase);

        const fileData = await fetch(compressed.uri).then((res) => res.blob());
        console.log("Blob size:", fileData.size);
        console.log("Blob type:", fileData.type);

        const presignal = await awsApi.generarPresignal({
          path: `TEST/VERIFICACION/IMAGENES/${vdId}_${i}`,
        });

        const response = await fetch(presignal.url, {
          method: "PUT",
          headers: {
            "Content-Type": fileData.type, // image/jpeg o image/png
          },
          body: fileData,
        });

        if (response.ok) {
          console.log("✅ Imagen subida correctamente");
        } else {
          console.error("❌ Error al subir imagen:", response.status);
        }
      }
      setLoading(false);

      // const verificacionesSinImagen: any[] = [];

      // for (let i = 0; i < verificacion.length; i++) {
      //   const img = verificacion[i];
      //   // Comprimir imagen
      //   const compressed = await compressImage(img.vcImagenBase);

      //   // Agregar imagen al FormData con nombre único
      //   formData.append(`imagen_${i}`, {
      //     uri: compressed.uri,
      //     name: `verificacion_${vdId}_${i}.jpg`,
      //     type: "image/jpeg",
      //   } as any);
      // }

      // Eliminar la imagen del objeto antes de agregarlo como JSON

      // const verifica = verificacion[0];
      // const { vcImagenBase, ...resto } = verifica;
      // verificacionesSinImagen.push(resto);

      // formData.append("verificaciones", JSON.stringify(verificacionesSinImagen));

      // await sincronizacionApi.sincronizarVerificacionEnviar(formData);

      // await dbSqliteService.actualizarVerificacionesDetalles({
      //   vdId: verificacion[0].vrId ?? -1,
      //   estado: 1,
      // });
      // for (let i = 0; i < verificacion.length; i++) {
      //   await eliminarImagen(verificacion[i].vcImagenBase);
      // }

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
