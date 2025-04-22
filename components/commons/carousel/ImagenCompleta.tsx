import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Modal } from "react-native";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO } from "@/constants/Colors";
import IconFont from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import { Alert } from "react-native";

interface PropsImagenCompleta {
  visible: boolean;
  onClose: () => void;
  item: IImagenCompleta;
  modulo?: string;
  deleteImage?: (img: string) => void;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ImagenCompleta: React.FC<PropsImagenCompleta> = ({
  onClose,
  visible,
  item,
  modulo = "carrusel", // para quitar o poner el toque fuera de la imagen
  deleteImage,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalView} pointerEvents="auto">
        <View style={styles.headerModal} pointerEvents="auto">
          <Text style={styles.textHeaderModal}>{item.titulo}</Text>
          <Button
            title="Press me"
            color="#f194ff"
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconFont
              name="close"
              size={convertirTamanoHorizontal(20)}
              color={BLANCO}
            />
          </TouchableOpacity> */}

          {modulo === "camara" && (
            <Pressable
              onPress={() => deleteImage && deleteImage(item.url)}
              style={styles.closeButton}
            >
              <IconFont
                name="trash"
                size={convertirTamanoHorizontal(20)}
                color={BLANCO}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.body}>
          <Image
            style={[styles.imagen]}
            source={{
              uri: item.url,
            }}
            resizeMode={"contain"}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ImagenCompleta;

const styles = StyleSheet.create({
  modalView: {
    width: width,
    height: height,
    paddingHorizontal: convertirTamanoHorizontal(10),
    paddingVertical: convertirTamanoVertical(15),
    backgroundColor: "rgba(0,0,0,1)",
    alignItems: "center",
    zIndex: 1000,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeaderModal: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(15),
    fontWeight: "regular",
    color: BLANCO,
  },
  closeButton: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoHorizontal(40),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: convertirTamanoHorizontal(5),
  },
  body: {
    flex: 1,
    width: "100%",
    // backgroundColor: "red",
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
});
