import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "react-native";
import IconFont from "react-native-vector-icons/FontAwesome";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO } from "@/constants/Colors";

interface PropsModalCustom {
  visible: boolean;
  onClose: () => void;
  titulo?: string;
  children: React.ReactNode;
}

const ModalCustom: React.FC<PropsModalCustom> = ({
  onClose,
  visible,
  children,
  titulo = "",
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerModal}>
            <Text style={styles.textHeaderModal}>{titulo}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <IconFont name="close" size={convertirTamanoHorizontal(20)} />
            </Pressable>
          </View>
          <View style={styles.bodyModal}>
            <ScrollView
              style={{ width: "100%" }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "90%",
    paddingHorizontal: convertirTamanoHorizontal(20),
    paddingVertical: convertirTamanoVertical(15),
    backgroundColor: BLANCO,
    borderRadius: convertirTamanoHorizontal(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeaderModal: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(20),
    fontWeight: "bold",
  },
  closeButton: {
    width: convertirTamanoHorizontal(30),
    height: convertirTamanoHorizontal(30),
    justifyContent: "center",
    alignItems: "center",
  },
  bodyModal: {
    maxHeight: convertirTamanoVertical(800),
    width: "100%",
    marginTop: convertirTamanoVertical(10),
  },
});
