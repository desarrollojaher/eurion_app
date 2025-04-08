import { Image, ImageStyle, StyleSheet } from "react-native";
import React from "react";

interface PropsImagenContainer {
  url?: any;
  style?: ImageStyle;
}

const ImagenContainer: React.FC<PropsImagenContainer> = ({
  url = require("@/assets/images/logo.png"),
  style,
}) => {
  return <Image resizeMode="contain" source={url} style={style} />;
};

export default ImagenContainer;

const styles = StyleSheet.create({});
