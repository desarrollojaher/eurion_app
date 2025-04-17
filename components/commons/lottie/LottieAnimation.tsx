import { StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsAnimation {
  resource: any;
  width?: number;
  height?: number;
}

const LottieAnimation: React.FC<PropsAnimation> = ({
  resource, // el reqired de la anmacion
  height = convertirTamanoVertical(200),
  width = convertirTamanoHorizontal(200),
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height,
          backgroundColor: "#fff",
        }}
        source={resource}
      />
    </View>
  );
};

export default LottieAnimation;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
