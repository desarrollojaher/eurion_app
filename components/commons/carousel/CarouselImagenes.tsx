import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import CarouselItem from "./CarouselItem";
import { TouchableOpacity } from "react-native";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { AZUL, GRIS } from "@/constants/Colors";
import ImagenCompleta from "./ImagenCompleta";

interface PropsCarouselImagenes {
  data: any[];
  height?: number;
  width: number;
  paginacion?: boolean;
}

const CarouselImagenes: React.FC<PropsCarouselImagenes> = ({
  data,
  height,
  width,
  paginacion,
}) => {
  const [modalImagenCompleta, setModalImagenCompleta] =
    useState<boolean>(false);
  const [imagen, setImagen] = useState<any>(null);

  const handleCloseModal = useCallback(() => {
    setModalImagenCompleta(false);
  }, []);

  const handleOpenImagenCompleta = useCallback((dato: any) => {
    setImagen(dato);
    setModalImagenCompleta(true);
  }, []);

  const slideValue = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<any>(null);

  // const handleOpenImagenCompleta = useCallback((dato: any) => {
  //   onTapImagen && onTapImagen(dato);
  // }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <CarouselItem
        handleOpenImagenCompleta={handleOpenImagenCompleta}
        index={index}
        item={item}
        slideValue={slideValue}
        height={height}
        width={width}
      />
    ),
    [handleOpenImagenCompleta, height, slideValue, width]
  );

  const onScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      setActiveIndex(index);
      slideValue.value =
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;
    },
    [slideValue]
  );

  const handlePointPress = useCallback((index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(datos) => datos.titulo.toString()}
        />
        {paginacion && (
          <View style={styles.containerPuntos}>
            {data.map((point, index) => (
              <TouchableOpacity
                disabled
                key={index}
                onPress={() => handlePointPress(index)}
                style={[
                  styles.point,
                  index === activeIndex && styles.selectedPoint,
                ]}
              />
            ))}
          </View>
        )}
      </View>
      {modalImagenCompleta && (
        <ImagenCompleta
          onClose={handleCloseModal}
          visible={modalImagenCompleta}
          item={imagen}
        />
      )}
    </>
  );
};

export default CarouselImagenes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPuntos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    width: convertirTamanoHorizontal(20),
    height: convertirTamanoVertical(10),
    backgroundColor: GRIS,
    marginHorizontal: convertirTamanoHorizontal(10),
    marginTop: convertirTamanoVertical(20),
    borderRadius: convertirTamanoHorizontal(15),
  },
  selectedPoint: {
    width: convertirTamanoHorizontal(20),
    height: convertirTamanoVertical(10),
    backgroundColor: AZUL,
  },
});
