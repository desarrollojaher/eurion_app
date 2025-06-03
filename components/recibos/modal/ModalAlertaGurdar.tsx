import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";
import ButtonCustom from "@/components/commons/button/ButtonCustom";

interface PropsModalAlertaGurdar {
  visible: boolean;
  onClose: () => void;
  handleGuardar: (e?: React.BaseSyntheticEvent) => void;
}

const ModalAlertaGurdar: React.FC<PropsModalAlertaGurdar> = ({
  onClose,
  visible,
  handleGuardar,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Alerta">
      <LottieAnimation
        resource={require("../../../assets/animations/alerta.json")}
      />
      <Text style={styles.tituloStyle}>
        Los cambios se guardaran, asegurece de completar toda la información
      </Text>
      <Text style={styles.descripcionStyle}>¿Estas seguro de guardar?</Text>
      <View style={styles.constainerButton}>
        <ButtonCustom
          label="Salir"
          style={styles.styleButtonSalir}
          onPress={onClose}
        />
        <ButtonCustom
          label="Guardar"
          style={styles.styleButtonMantener}
          onPress={handleGuardar}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalAlertaGurdar;

const styles = StyleSheet.create({
  tituloStyle: {
    fontSize: convertirTamanoHorizontal(20),
    fontWeight: "bold",
  },
  descripcionStyle: {
    fontSize: convertirTamanoHorizontal(18),
    color: GRIS,
    marginTop: convertirTamanoVertical(10),
  },
  constainerButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: convertirTamanoHorizontal(15),
    marginTop: convertirTamanoVertical(20),
  },
  styleButtonSalir: {
    width: "40%",
  },
  styleButtonMantener: {
    width: "40%",
  },
});
