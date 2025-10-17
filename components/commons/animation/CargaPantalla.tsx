import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { AZUL } from "@/constants/Colors";

const CargaPantalla = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);
  return (
    <View style={styles.panta}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../../../assets/images/splash-icon.png")}
          style={[styles.imagen, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
      <Text style={{ color: "white" }}>ERION APP</Text>
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
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 200,
    height: 200,
    transform: [{ scale: 1.5 }], // Escala 1.5x
  },
});
