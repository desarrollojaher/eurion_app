import * as Location from "expo-location";

export const getUbicacion = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  return location;
};
