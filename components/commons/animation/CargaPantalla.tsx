import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AZUL } from "@/constants/Colors";

const CargaPantalla = () => {
  return (
    <View style={styles.panta}>
      <Text>CargaPantalla</Text>
    </View>
  );
};

export default CargaPantalla;

const styles = StyleSheet.create({
  panta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AZUL,
  },
});
