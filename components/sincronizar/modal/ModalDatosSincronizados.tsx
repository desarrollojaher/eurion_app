import React, { useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import { StyleSheet, Text } from "react-native";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";

interface PropsModalDatosSincronizados {
  visible: boolean;
  onClose: () => void;
}

const ModalDatosSincronizados: React.FC<PropsModalDatosSincronizados> = ({
  onClose,
  visible,
}) => {
  const resource = useMemo(() => {
    return require("../../../assets/animations/exito.json");
  }, []);

  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo="Datos sincronizados"
    >
      <LottieAnimation resource={resource} />
      <Text style={styles.texto}>Se sincronizaron todos los datos</Text>
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

export default ModalDatosSincronizados;
