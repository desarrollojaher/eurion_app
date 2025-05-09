import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BLANCO } from "@/constants/Colors";

interface PropsLoadingComponent {
  isLoading: boolean;
}

const LoadingComponent: React.FC<PropsLoadingComponent> = ({ isLoading }) => {
  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={BLANCO} />
        <Text style={styles.text}>Cargando datos...</Text>
      </View>
    );
  return null;
};

export default LoadingComponent;

const styles = StyleSheet.create({
  text: {
    color: BLANCO,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
});
