import { sincronizacionApi } from "@/api/sincronizacion";
import { IRecibosEnviar, IRecibosObtener } from "@/models/IRecibo";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { recibosKeys } from "./recibosKeys";
import { awsApi } from "@/api/aws";
import { compressImage } from "@/helper/function/comprimirImagen";
import { BucketS3Jaher } from "@/constants/env";

export const useRecibosEnviar = (
  mutationOptions?: UseMutationOptions<unknown, any, IRecibosObtener, unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IRecibosObtener) => {
      // const url = await awsApi.obtenerPath({ modulo: "VERIFICACIONES" });
      const datos: IRecibosEnviar = {
        crId: data.crId ?? -1,
        pgValorCobrado: data.pgValorCobrado ?? 0,
        usIdCobrador: data.usIdCobrador ?? -1,
        fpId: data.fpId ?? -1,
        pgFechaCobro: data.pgFechaCobro ?? new Date().toISOString(),
        pgObservaciones: data.pgObservaciones ?? "",
        pgLatitud: data.pgLatitud ?? 0,
        pgLongitud: data.pgLongitud ?? 0,
        gcId: data.gcId ?? -1,
        pgEstado: 1,
        pgBucket: "",
        pgKeyImagen: "",
        pgPath: "",
        pgMimetype: "",
        caId: data.caId ?? -1,
        hdId: data.hdId ?? -1,
      };
      if (
        data.urlImg !== null &&
        data.urlImg !== undefined &&
        data.urlImg !== ""
      ) {
        const url = "CEDULA/VERIFICACIONES/RECIBOS";
        const urlS3 = url.replace("CEDULA", data.identificacionCliente ?? "-1");
        const compressed = await compressImage(data.urlImg ?? "");
        const fileData = await fetch(compressed.uri).then((res) => res.blob());
        const presignal = await awsApi.generarPresignal({
          path: `${urlS3}`,
        });
        const response = await fetch(presignal.url, {
          method: "PUT",
          headers: {
            "Content-Type": fileData.type,
          },
          body: fileData,
        });
        if (response.ok) {
          datos.pgBucket = BucketS3Jaher;
          datos.pgPath = urlS3;
          datos.pgKeyImagen = presignal.uuid;
          datos.pgMimetype = fileData.type;
        } else {
          throw new Error("Error al subir imagen");
        }
      }
      return sincronizacionApi.sincronizarRecibosEnviar(datos);
    },
    onSuccess: (data, variables) => {
      dbSqliteService.actualizarRecibos(variables);
      queryClient.invalidateQueries({ queryKey: recibosKeys.todos() });
      Toast.success("Recibo enviado");
    },
    onError: (error: any) => {
      Toast.error(error.response.data.message || "Error al enviar el recibo");
    },
    ...mutationOptions,
  });
};
