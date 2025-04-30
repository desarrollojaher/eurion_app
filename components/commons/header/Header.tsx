import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import IconFont from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface PropsHeader {
  title?: string;
  iconRight?: React.ReactNode;
  handleTapIconRight?: () => void;
  handleTapIconLeft?: () => void;
}

const Header: React.FC<PropsHeader> = ({
  title = "",
  iconRight,
  handleTapIconRight,
  handleTapIconLeft,
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.containerStyle}>
        <IconFont
          name="chevron-left"
          size={convertirTamanoHorizontal(30)}
          color={BLANCO}
        />
      </TouchableOpacity>
      <Text style={styles.textHeader} numberOfLines={1}>
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
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: convertirTamanoVertical(50),
    paddingHorizontal: convertirTamanoHorizontal(30),
    flexDirection: "row",
    gap: 3,
  },
  containerStyle: {
    width: convertirTamanoHorizontal(30),
    height: convertirTamanoVertical(35),
    alignItems: "center",
  },
  textHeader: {
    flex: 1,
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(24),
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
