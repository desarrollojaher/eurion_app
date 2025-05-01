import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";
import ButtonCustom from "@/components/commons/button/ButtonCustom";

interface PropsModalAlertaSubirEliminar {
  visible: boolean;
  onClose: () => void;
  tipo?: "subir" | "eliminar";
  handleSubir?: () => void;
  handleEliminar?: () => void;
  subidaGeneral?: boolean;
}

const ModalAlertaSubirEliminar: React.FC<PropsModalAlertaSubirEliminar> = ({
  onClose,
  visible,
  tipo = "subir",
  handleEliminar,
  handleSubir,
  subidaGeneral,
}) => {
  const animation = useMemo(() => {
    if (tipo === "subir") {
      return require("../../../assets/animations/upload.json");
    } else {
      return require("../../../assets/animations/delete.json");
    }
  }, [tipo]);
  const handleAccion = useCallback(() => {
    if (tipo === "subir") {
      handleSubir && handleSubir();
    } else {
      handleEliminar && handleEliminar();
    }
    onClose();
  }, [handleEliminar, handleSubir, onClose, tipo]);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Alerta">
      <LottieAnimation resource={animation} />
      {!subidaGeneral ? (
        <Text style={styles.tituloStyle}>
          El archivo se {tipo === "subir" ? "subira" : "eliminara"}
          {tipo === "subir" ? " al sistema" : " de forma permanente"}
        </Text>
      ) : (
        <Text style={styles.tituloStyle}>
          Las gestiones, actualizaciones y recibos realizados se subirán al
          sistema
        </Text>
      )}
      <Text style={styles.descripcionStyle}>
        ¿Estas seguro de realizar esta acción?
      </Text>
      <View style={styles.constainerButton}>
        <ButtonCustom
          label="Salir"
          style={styles.styleButtonSalir}
          onPress={onClose}
        />
        <ButtonCustom
          label={tipo === "subir" ? "Subir" : "Eliminar"}
          style={styles.styleButtonMantener}
          onPress={handleAccion}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalAlertaSubirEliminar;

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
