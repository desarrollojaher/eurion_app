import * as Location from "expo-location";

export const getUbicacion = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }
  let location1 = await Location.getLastKnownPositionAsync();
  if (location1) {
    return location1;
  }
  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return location;
};
