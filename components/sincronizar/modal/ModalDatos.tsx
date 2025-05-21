import React, { useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import { StyleSheet, Text } from "react-native";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";

interface PropsModalDatos {
  visible: boolean;
  onClose: () => void;
  tabla: string;
  index: number;
  cantidadDatos: number;
}

const ModalDatos: React.FC<PropsModalDatos> = ({
  onClose,
  visible,
  index,
  tabla,
  cantidadDatos,
}) => {
  const resource = useMemo(() => {
    return require("../../../assets/animations/download.json");
  }, []);

  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo={`Descargando ${index}/13`}
    >
      <LottieAnimation resource={resource} />
      <Text style={styles.texto}>
        Descargando {cantidadDatos} archivos de {tabla}
      </Text>
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

export default ModalDatos;
