import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Toast } from "toastify-react-native";
export const descargarArchivos = async (
  path: string,
  nombreArchivo: string,
) => {
  try {
    let progreso = 0;
    const fileUri = FileSystem.documentDirectory + nombreArchivo;
    const downloadUrl = path;

    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if (!granted) {
      Toast.info("No se puede guardar el archivo sin permisos.");
      return;
    }

    const info = await FileSystem.getInfoAsync(fileUri);
    if (info.exists) {
      return fileUri;
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      downloadUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const percent =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        progreso = Math.round(percent * 100);
      },
    );

    await downloadResumable.downloadAsync();

    // const downloadResult = await FileSystem.downloadAsync(downloadUrl, fileUri);
    return fileUri;
  } catch (error: any) {
    console.error("Error en fileService.download:", JSON.stringify(error));
    Toast.error(`Error al descargar el archivo: ${error.message}`);
  }
};
