import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSession } from "@/helper/provider/Auth";
import { BLANCO } from "@/constants/Colors";

const Principal = () => {
  const { signOut } = useSession();

  const handleLogOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>Bienvenido Byron </Text>
        <Pressable onPress={handleLogOut} style={styles.iconStyle}>
          <Icon
            name={"logout"}
            size={convertirTamanoHorizontal(30)}
            color={BLANCO}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: convertirTamanoHorizontal(35),
  },
  iconStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoVertical(40),
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: convertirTamanoVertical(72),
  },
  textHeader: {
    fontSize: convertirTamanoHorizontal(32),
    fontWeight: "bold",
    color: BLANCO,
  },
});
