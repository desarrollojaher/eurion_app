import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import Animated, { SharedValue } from "react-native-reanimated";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { IImagenCompleta } from "@/models/IImagenCompleta";

interface PropsCarouselItem {
  handleOpenImagenCompleta: (dato: IImagenCompleta) => void;
  slideValue: SharedValue<number>;
  index: number;
  item: IImagenCompleta;
  height?: number;
  width?: number;
}
const screenWidth = Dimensions.get("window").width;

const CarouselItem: React.FC<PropsCarouselItem> = ({
  handleOpenImagenCompleta,
  index,
  item,
  slideValue,
  height,
  width = screenWidth,
}) => {
  const styleContaner = useMemo(() => {
    if (height) return { height: convertirTamanoVertical(height) };
    return {};
  }, [height]);

  const handleOpenImage = useCallback(() => {
    handleOpenImagenCompleta(item);
  }, [handleOpenImagenCompleta, item]);

  return (
    <TouchableOpacity onPress={handleOpenImage}>
      <View style={[styles.container, styleContaner, { width }]}>
        <Animated.View style={[styles.imagenContainer]}>
          {/*animatedContainerStyle*/}
          <Text style={styles.overlayText}>{item.titulo}</Text>
          {/*imageStyle*/}
          <Animated.Image
            style={[styles.imagen]}
            source={{
              uri: item.url,
            }}
            resizeMode={"contain"}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: convertirTamanoHorizontal(15),
    marginTop: convertirTamanoVertical(20),
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  imagenContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderTopStartRadius: convertirTamanoHorizontal(18),
    borderTopEndRadius: convertirTamanoHorizontal(18),
    borderBottomEndRadius: convertirTamanoHorizontal(18),
    borderBottomStartRadius: convertirTamanoHorizontal(18),
    justifyContent: "center",
    alignItems: "center",
  },
});
