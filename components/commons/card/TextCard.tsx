import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";
import { GRIS, NEGRO } from "@/constants/Colors";

interface PropsTextCard {
  titulo: string;
  subtitulo?: string;
}

const TextCard: React.FC<PropsTextCard> = ({ titulo, subtitulo }) => {
  return (
    <View>
      <Text style={styles.styleTitulo}>{titulo}</Text>
      <Text style={styles.styleSubtitulo}>{subtitulo}</Text>
    </View>
  );
};

export default TextCard;

const styles = StyleSheet.create({
  styleTitulo: {
    fontSize: convertirTamanoHorizontal(15),
    fontWeight: "700",
    color: NEGRO,
  },
  styleSubtitulo: {
    fontSize: convertirTamanoHorizontal(13),
    color: GRIS,
  },
});
