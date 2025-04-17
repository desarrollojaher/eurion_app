import { StyleSheet, View } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import CarouselImagenes from "@/components/commons/carousel/CarouselImagenes";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
interface PropsModalSincronizarImagenes {
  visible: boolean;
  onClose: () => void;
}

const ModalSincronizarImagenes: React.FC<PropsModalSincronizarImagenes> = ({
  onClose,
  visible,
}) => {
  return (
    <>
      <ModalCustom onClose={onClose} visible={visible}>
        <View style={styles.container}>
          <CarouselImagenes
            data={[
              {
                titulo: "imagen1",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
              },
              {
                titulo: "imagen2",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
              },
            ]}
            width={convertirTamanoHorizontal(330)}
            paginacion
            // onTapImagen={handleOpenImagenCompleta}
          />
        </View>
      </ModalCustom>
    </>
  );
};

export default ModalSincronizarImagenes;

const styles = StyleSheet.create({
  container: {
    height: convertirTamanoVertical(280),
  },
});
