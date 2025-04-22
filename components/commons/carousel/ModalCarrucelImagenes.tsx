import { StyleSheet, View } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import CarouselImagenes from "@/components/commons/carousel/CarouselImagenes";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { IImagenCompleta } from "@/models/IImagenCompleta";
interface PropsModalCarrucelImagenes {
  visible: boolean;
  onClose: () => void;
  data: IImagenCompleta[];
}

const ModalCarrucelImagenes: React.FC<PropsModalCarrucelImagenes> = ({
  onClose,
  visible,
  data,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible}>
      <View style={styles.container}>
        <CarouselImagenes
          data={data}
          width={convertirTamanoHorizontal(330)}
          paginacion
        />
      </View>
    </ModalCustom>
  );
};

export default ModalCarrucelImagenes;

const styles = StyleSheet.create({
  container: {
    height: convertirTamanoVertical(280),
  },
});
