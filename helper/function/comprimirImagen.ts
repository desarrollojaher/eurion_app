import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
export const compressImage = async (
  uri: string,
): Promise<ImageManipulator.ImageResult> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [], // No se aplica transformación (crop, resize, etc.)
      {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return result;
  } catch (error) {
    console.error("Error al comprimir la imagen:", error);
    throw error;
  }
};

export const eliminarImagen = async (ruta: string) => {
  try {
    const info = await FileSystem.getInfoAsync(ruta);
    if (info.exists) {
      await FileSystem.deleteAsync(ruta, { idempotent: true });
      //console.log("✅ Imagen eliminada:", ruta);
    } else {
      //console.log("⚠️ La imagen no existe:", ruta);
    }
  } catch (error) {
    console.error("❌ Error al eliminar imagen:", error);
  }
};
