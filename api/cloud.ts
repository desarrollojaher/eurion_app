import { postImagen } from "./config_imagenes";

export const cloudAPI = {
  obtenerPresignal: async (path: string, bucket: string) => {
    const res = await postImagen(`s3/services/obtener-presigned-url`, {
      path,
      bucket,
    });
    return res.data;
  },
};
