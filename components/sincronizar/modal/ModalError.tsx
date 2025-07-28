import React, { useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import { StyleSheet, Text } from "react-native";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";

interface PropsModalError {
  visible: boolean;
  onClose: () => void;
  tabla: string;
  errorMessage: string;
}

const ModalError: React.FC<PropsModalError> = ({
  onClose,
  visible,
  tabla,
  errorMessage,
}) => {
  const resource = useMemo(() => {
    return require("../../../assets/animations/error.json");
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Error">
      <LottieAnimation resource={resource} />
      <Text style={styles.texto}>{errorMessage}</Text>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalError;
