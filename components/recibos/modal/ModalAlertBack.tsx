import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import { router } from "expo-router";

interface PropsModalAlertBack {
  visible: boolean;
  onClose: () => void;
}

const ModalAlertBack: React.FC<PropsModalAlertBack> = ({
  onClose,
  visible,
}) => {
  const handleSalir = useCallback(() => {
    router.back();
    onClose();
  }, [onClose]);
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Alerta">
      <LottieAnimation
        resource={require("../../../assets/animations/alerta.json")}
      />
      <Text style={styles.tituloStyle}>
        Los datos que se ingresaron se perderan al salir
      </Text>
      <Text style={styles.descripcionStyle}>¿Estas seguro de salir?</Text>
      <View style={styles.constainerButton}>
        <ButtonCustom
          label="Salir"
          style={styles.styleButtonSalir}
          onPress={handleSalir}
        />
        <ButtonCustom
          label="Permanecer "
          style={styles.styleButtonMantener}
          onPress={onClose}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalAlertBack;

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
