import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { router } from "expo-router";

interface PropsModalSincronizar {
  visible: boolean;
  onClose: () => void;
}

const ModalSincronizar: React.FC<PropsModalSincronizar> = ({
  onClose,
  visible,
}) => {
  const animation = useMemo(() => {
    return require("../../../assets/animations/download.json");
  }, []);

  const handleSincronizarDatos = useCallback(() => {
    router.push("/principal/sincronizar");
    onClose();
  }, [onClose]);
  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo="Sincronización necesaria"
    >
      <LottieAnimation resource={animation} />
      <Text style={styles.tituloStyle}>
        Es necesario sincronizar los datos para ocupar este módulo
      </Text>
      <View style={styles.constainerButton}>
        <ButtonCustom
          label="Salir"
          style={styles.styleButtonSalir}
          onPress={onClose}
        />
        <ButtonCustom
          label="Ir a sincronizar"
          style={styles.styleButtonMantener}
          onPress={handleSincronizarDatos}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalSincronizar;

const styles = StyleSheet.create({
  styleButtonSalir: {
    width: "40%",
  },
  styleButtonMantener: {
    width: "40%",
  },
  constainerButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: convertirTamanoHorizontal(15),
    marginTop: convertirTamanoVertical(20),
  },
  tituloStyle: {
    fontSize: convertirTamanoHorizontal(20),
    fontWeight: "bold",
  },
});
