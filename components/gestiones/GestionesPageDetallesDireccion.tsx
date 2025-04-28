import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Card from "../commons/card/Card";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "../commons/card/TextInput";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS } from "@/constants/Colors";
import * as Location from "expo-location";
import { Toast } from "toastify-react-native";
import CarouselImagenes from "../commons/carousel/CarouselImagenes";
import Camara from "../commons/camera/Camara";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import { remove } from "lodash";

const GestionesPageDetallesDireccion = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [modalCamara, setModalCamara] = useState(false);
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const handleOpenCamara = useCallback(() => {
    setModalCamara(true);
  }, []);
  const handleCloseCamara = useCallback(() => {
    setModalCamara(false);
  }, []);

  const handleCaptureCamara = useCallback(
    (data: IImagenCompleta[]) => {
      const union = imagenes.concat(data);
      setImagenes(union);
    },
    [imagenes]
  );

  const handleRemoveImage = useCallback(
    (indexElemento: number) => {
      const images = remove(
        imagenes,
        (item) => item !== imagenes[indexElemento]
      );
      setImagenes(images);
    },
    [imagenes]
  );

  const handleObtenerDireccionGps = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.error("El GPS no tiene permiso");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }, []);

  return (
    <View style={styles.containerGeneral}>
      {modalCamara && (
        <Camara
          onClose={handleCloseCamara}
          visible={modalCamara}
          handleCaptureImage={handleCaptureCamara}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.cardStyle}>
          {imagenes.length > 0 ? (
            <CarouselImagenes
              data={imagenes}
              width={convertirTamanoHorizontal(350)}
              paginacion={true}
              handleRemoveImage={handleRemoveImage}
              modulo="galeria"
              remove
              camera
              handleOpenCamara={handleOpenCamara}
            />
          ) : (
            <Pressable
              onPress={handleOpenCamara}
              style={styles.containerPressable}
            >
              <Icon name="camera" size={convertirTamanoHorizontal(80)} />
            </Pressable>
          )}
        </Card>

        <Card style={styles.cardMargin}>
          <TextInput
            tipo="text"
            text="Dirección"
            direction="column"
            multiline={true}
            placeholder="Direccion"
            styleHeader={styles.styleTextHeader}
          />
          <TextInput
            tipo="text"
            text="Detalles Adicionales"
            direction="column"
            multiline={true}
            placeholder="Detalles Adicionales"
            styleHeader={styles.styleTextHeader}
          />
        </Card>

        <Card style={styles.cardMargin}>
          <HeaderCard labelLeft="Coordinadas" />
          <HeaderCard
            labelLeft="Latitud"
            labelRight={
              location?.coords.latitude
                ? String(location?.coords.latitude)
                : "No hay ubicacion"
            }
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Longitud"
            labelRight={
              location?.coords.longitude
                ? String(location?.coords.longitude)
                : "No hay ubicacion"
            }
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <View style={styles.containerBotones}>
            <TouchableOpacity
              style={styles.containerBoton}
              onPress={handleObtenerDireccionGps}
            >
              <Icon
                name="location-arrow"
                size={convertirTamanoHorizontal(35)}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default GestionesPageDetallesDireccion;

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    alignItems: "center",
  },
  cardStyle: {
    height: convertirTamanoVertical(300),
    width: convertirTamanoHorizontal(370),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: convertirTamanoVertical(30),
  },
  cardMargin: {
    width: convertirTamanoHorizontal(370),
    marginVertical: convertirTamanoVertical(10),
    gap: convertirTamanoVertical(10),
  },
  styleTextHeader: {
    width: "100%",
    fontSize: convertirTamanoHorizontal(14),
    marginVertical: convertirTamanoVertical(5),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(130),
  },
  styleLabelRigth: {
    width: convertirTamanoHorizontal(240),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: convertirTamanoVertical(50),
  },
  containerBoton: {
    height: convertirTamanoVertical(60),
    width: convertirTamanoHorizontal(60),
    alignItems: "center",
    justifyContent: "center",
  },
  containerPressable: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
