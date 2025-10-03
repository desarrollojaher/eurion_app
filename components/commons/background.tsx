import { StyleSheet, View } from "react-native";
import React from "react";
import { BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.fondo}>
        {/* <Text style={styles.text}>Eurion</Text> */}
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: BLANCO,
  },
  text: {
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(12),
    paddingHorizontal: convertirTamanoHorizontal(10),
    paddingVertical: convertirTamanoVertical(10),
    position: "absolute",
  },
});
