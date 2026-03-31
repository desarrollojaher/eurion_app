import * as Location from "expo-location";

export const getUbicacion = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  const enabled = await Location.hasServicesEnabledAsync();
  if (status !== "granted") {
    return { location: null, mensaje: "El GPS no tiene permiso" };
  }

  if (!enabled) {
    return { location: null, mensaje: "El GPS esta apagado" };
  }

  try {
    // Usamos Promise.race para limitar el tiempo de espera
    const location = await Promise.race([
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      }),
      new Promise(
        (_, reject) =>
          setTimeout(
            () => reject(new Error("Tiempo de espera excedido para el gps")),
            6000,
          ), // 6 segundos
      ),
    ]);

    return { location, mensaje: "" };
  } catch (error: any) {
    return {
      location: null,
      mensaje: `Error al obtener la ubicación: ${error.message}`,
    };
  }
};
