import { IImagenCompleta } from "@/models/IImagenCompleta";
import * as FileSystem from "expo-file-system";

export const handleChangeDireccionImagenes = async (
  imagenes: IImagenCompleta,
) => {
  try {
    const info = await FileSystem.getInfoAsync(imagenes.url);
    if (info.exists) {
      const folder = `${FileSystem.documentDirectory}photos`;
      await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
      const newPath = `${folder}/${imagenes.titulo}.jpg`;

      await FileSystem.moveAsync({
        from: imagenes.url,
        to: newPath,
      });
      return newPath;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error al mover la imagen:", err);
    return null;
  }
};
