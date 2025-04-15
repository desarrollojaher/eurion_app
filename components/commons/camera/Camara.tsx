import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import ModalCustom from "../modal/ModalCustom";
import LottieAnimation from "../lottie/LottieAnimation";
import ButtonCustom from "../button/ButtonCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { Modal } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { BLANCO } from "@/constants/Colors";
import { Toast } from "toastify-react-native";
import { remove } from "lodash";

interface PropsCamara {
  onClose: () => void;
  visible: boolean;
}

const Camara: React.FC<PropsCamara> = ({ onClose, visible }) => {
  const [facing, setFacing] = useState<CameraType>("back");

  const [imagenes, setImagenes] = useState<string[]>([]);

  const [permission, requestPermission] = useCameraPermissions();

  const ref = useRef<CameraView>(null);

  const handleToggleCamera = useCallback(() => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }, []);

  const handleTakePicture = useCallback(async () => {
    const photo = await ref.current?.takePictureAsync();
    if (!photo) {
      Toast.error("No se pudo tomar la foto");
      return;
    } else {
      setImagenes((current) => [...current, photo.uri]);
    }
  }, []);

  const handleGuardarDatos = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleRemoveImage = useCallback(
    (indexElemento: number) => {
      console.log(imagenes);

      console.log(indexElemento);
      console.log(imagenes[indexElemento]);

      //   const datos = remove(
      //     imagenes,
      //     (item) => item === imagenes[indexElemento]
      //   );

      //   const newImages = imagenes.filter((_, i) => i !== indexElemento);
      //   setImagenes(newImages);
    },
    [imagenes]
  );

  const handleRenderizarImagenes = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item }}
          resizeMode="contain"
          style={{
            width: convertirTamanoHorizontal(60),
            height: convertirTamanoVertical(80),
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => handleRemoveImage(index)}
        >
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  if (!permission) {
    // cuando la camara esta cargando
    return (
      <ModalCustom onClose={onClose} visible={visible}>
        <LottieAnimation
          resource={require("../../../assets/animations/loadingCamara.json")}
        />
        <Text style={styles.message}>Cargando cámara...</Text>
      </ModalCustom>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ModalCustom onClose={onClose} visible={visible}>
        <LottieAnimation
          resource={require("../../../assets/animations/permisoCamara.json")}
        />
        <Text style={styles.message}>
          Necesitas conceder permisos para usar la cámara
        </Text>
        <View style={styles.containerBoton}>
          <ButtonCustom label="Conceder permisos" onPress={requestPermission} />
        </View>
      </ModalCustom>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          responsiveOrientationWhenOrientationLocked
          ref={ref}
        >
          <View style={styles.containerGeneral}>
            <View />
            <View>
              <View style={styles.imagenContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={imagenes}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  renderItem={handleRenderizarImagenes}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGuardarDatos}
                >
                  <Icon
                    name="save"
                    color={BLANCO}
                    size={convertirTamanoHorizontal(50)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleTakePicture}
                >
                  <Icon
                    name="camera"
                    color={BLANCO}
                    size={convertirTamanoHorizontal(60)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleToggleCamera}
                >
                  <Icon
                    name="camera-reverse"
                    color={BLANCO}
                    size={convertirTamanoHorizontal(60)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

export default Camara;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    marginVertical: convertirTamanoVertical(10),
    fontSize: convertirTamanoHorizontal(15),
  },
  containerBoton: {
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    margin: convertirTamanoVertical(30),
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: convertirTamanoHorizontal(24),
    fontWeight: "bold",
    color: BLANCO,
  },
  textFlash: {
    fontSize: convertirTamanoHorizontal(15),
    color: BLANCO,
  },
  imagenContainer: {
    height: convertirTamanoVertical(100),
    paddingHorizontal: convertirTamanoHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
  },
  containerGeneral: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  separator: {
    height: 1,
    width: convertirTamanoHorizontal(10),
  },
  closeButton: {
    position: "absolute",
    top: convertirTamanoVertical(-5),
    right: convertirTamanoHorizontal(-5),
    backgroundColor: "#000000aa",
    borderRadius: convertirTamanoHorizontal(15),
    width: convertirTamanoHorizontal(30),
    height: convertirTamanoVertical(30),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeText: {
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(20),
    lineHeight: convertirTamanoHorizontal(20),
  },
});
