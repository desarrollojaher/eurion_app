import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
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

interface PropsImagenCompleta {
  visible: boolean;
  onClose: () => void;
  item: any;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ImagenCompleta: React.FC<PropsImagenCompleta> = ({
  onClose,
  visible,
  item,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose}>
        <View style={styles.modalView}>
          <View style={styles.headerModal}>
            <Text style={styles.textHeaderModal}>{item.titulo}</Text>
            <Pressable onPress={() => onClose()} style={styles.closeButton}>
              <IconFont
                name="close"
                size={convertirTamanoHorizontal(20)}
                color={BLANCO}
              />
            </Pressable>
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
      </Pressable>
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
    backgroundColor: "rgba(0,0,0, 0.1)",
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
