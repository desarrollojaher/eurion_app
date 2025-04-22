import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";

interface PropsHeaderCard {
  labelLeft?: string;
  labelRight?: string;
  styleLeft?: any;
  styleRight?: any;
}

const HeaderCard: React.FC<PropsHeaderCard> = ({
  labelLeft,
  labelRight,
  styleLeft,
  styleRight,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textLeft, styleLeft]}>{labelLeft}</Text>
      <Text style={[styles.textRight, styleRight]}>{labelRight}</Text>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLeft: {
    fontWeight: "bold",
    fontSize: convertirTamanoHorizontal(16),
  },
  textRight: {
    fontSize: convertirTamanoHorizontal(13),
    fontWeight: "regular",
  },
});
