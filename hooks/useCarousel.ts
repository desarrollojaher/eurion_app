import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const useCarousel = (slideValue: SharedValue<number>, index: number) => {
  const inputValues = [index - 1, index, index + 1];

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      slideValue.value,
      inputValues,
      [80, 100, 80],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          slideValue.value,
          inputValues,
          [-50, 0, 50],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      slideValue.value,
      inputValues,
      [0.5, 1, 0.5], // Las imágenes laterales son translúcidas
      Extrapolation.CLAMP
    ),
    pointerEvents: "none",
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          slideValue.value,
          inputValues,
          [0.5, 1, 0.5],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return {
    animatedContainerStyle,
    imageStyle,
  };
};
