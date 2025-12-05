import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import { useSession } from "@/helper/provider/Auth";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsModalCerrarSesion {
  visible: boolean;
  onClose: () => void;
}

const ModalCerrarSesion: React.FC<PropsModalCerrarSesion> = ({
  onClose,
  visible,
}) => {
  const { signOut } = useSession();
  const animation = useMemo(() => {
    return require("../../../assets/animations/logout.json");
  }, []);

  const handleCerrarSesion = useCallback(() => {
    signOut();
    onClose();
  }, [onClose, signOut]);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Cerrar Sesion">
      <LottieAnimation resource={animation} />
      <Text style={styles.tituloStyle}>¿Estas seguro de cerrar sesión?</Text>
      <Text>Esta acción eliminará todos tus datos</Text>
      <View style={styles.constainerButton}>
        <ButtonCustom
          label="Cancelar"
          style={styles.styleButtonSalir}
          onPress={onClose}
        />
        <ButtonCustom
          label="cerrar sesión"
          style={styles.styleButtonMantener}
          onPress={handleCerrarSesion}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalCerrarSesion;

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
