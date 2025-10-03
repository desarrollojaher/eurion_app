import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import IconFont from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { AZUL, AZUL_CLARO, BLANCO, ROJO } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface PropsHeader {
  title?: string;
  iconRight?: React.ReactNode;
  handleTapIconRight?: () => void;
  handleTapIconLeft?: () => void;
  sincronizacion?: boolean;
}

const Header: React.FC<PropsHeader> = ({
  title = "",
  iconRight,
  handleTapIconRight,
  handleTapIconLeft,
  sincronizacion,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (handleTapIconLeft) {
      handleTapIconLeft();
    } else {
      router.back();
    }
  }, [handleTapIconLeft, router]);

  const handleIconRight = useCallback(() => {
    handleTapIconRight && handleTapIconRight();
  }, [handleTapIconRight]);

  return (
    <LinearGradient
      colors={[AZUL, AZUL_CLARO]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        !sincronizacion && styles.containerSincronizacion,
      ]}
    >
      <TouchableOpacity onPress={handleBack} style={styles.containerStyle}>
        <IconFont
          name="chevron-left"
          size={convertirTamanoHorizontal(30)}
          color={BLANCO}
        />
      </TouchableOpacity>
      <Text style={styles.textHeader} numberOfLines={1} ellipsizeMode="clip">
        {title}
      </Text>
      {iconRight && (
        <TouchableOpacity
          onPress={handleIconRight}
          style={styles.containerStyle}
        >
          {iconRight}
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: convertirTamanoVertical(20),
    paddingHorizontal: convertirTamanoHorizontal(30),
    flexDirection: "row",
    gap: convertirTamanoHorizontal(3),
  },
  containerStyle: {
    width: convertirTamanoHorizontal(45),
    height: convertirTamanoVertical(50),
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    flex: 1,
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(20),
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    alignSelf: "center",
  },
  containerSincronizacion: {
    height: convertirTamanoVertical(100),
    borderBottomWidth: convertirTamanoVertical(2),
    borderColor: ROJO,
  },
});
