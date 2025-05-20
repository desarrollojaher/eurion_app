import {
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import InputCustom from "../commons/input/InputCustom";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AZUL, GRIS, NEGRO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import Separador from "../commons/separador/Separador";
import TextCard from "../commons/card/TextCard";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import { jsonGestiones } from "@/helper/json/jsonGestiones";
import { IGstionesPrueba } from "@/models/IGestionesPrueba";
import ModalFiltros from "./modal/ModalFiltros";
import ModalCarrucelImagenes from "../commons/carousel/ModalCarrucelImagenes";
import ModalRealizarGestion from "./modal/ModalRealizarGestion";
import { router } from "expo-router";
import { useObtenerGestionesCabecera } from "@/service/gestiones/useObtenerGestionesCabecera";

const GestionesPagePrincipal = () => {
  const [modalFiltros, setModalFiltros] = useState(false);
  const [modalCarrucel, setModalCarrucel] = useState(false);
  const [modalGestionar, setModalGestionar] = useState(false);
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const { data: datosGestiones } = useObtenerGestionesCabecera({});

  console.log("Datos de gestiones ==> ", datosGestiones?.length);

  const handleOpenImagenes = useCallback((data: IImagenCompleta[]) => {
    setImagenes(data);
    setModalCarrucel(true);
  }, []);
  const handleAbrirGps = useCallback((data: any) => {
    Linking.openURL(
      `geo:${data.latitud},${data.longitud}?q=${data.latitud},${data.longitud}`
    );
  }, []);

  const handleOpenModalFiltros = useCallback(() => {
    setModalFiltros(true);
  }, []);

  const handleCloseModalFiltros = useCallback(() => {
    setModalFiltros(false);
  }, []);

  const handleCloseModalCarrucel = useCallback(() => {
    setModalCarrucel(false);
  }, []);

  const handleOpenModalGestion = useCallback(() => {
    setModalGestionar(true);
  }, []);

  const handleCloseModalGestion = useCallback(() => {
    setModalGestionar(false);
  }, []);

  const handleCambiarPagina = useCallback(() => {
    router.push("/principal/gestiones/gestiones-detalles");
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IGstionesPrueba; index: number }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={handleCambiarPagina}>
          <HeaderCard labelRight="Ruta" />
          <Separador />
          <TextCard
            titulo={item.nombreCliente}
            subtitulo={item.cedulaCliente}
          />
          <Text style={styles.styleText}>
            DOM CRISTOBAL COLON 1 DOCE DE OCTUBRE CASA DE 3 PISOS
          </Text>
          <Separador />
          <HeaderCard
            labelLeft="DEUDA TOTAL"
            labelRight={`$ ${item.deudaTotal}`}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="VENCIDO"
            labelRight={`$ ${item.vencimineto}`}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="TRAMO"
            labelRight="TRAMO"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="ZONA"
            labelRight="CUENCA ZONA 7 GAYARA (CORR)"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes(item.imagenes)}>
              <FontAwesome5 name="images" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleAbrirGps(item.posicion)}>
              <FontAwesome6 name="map-location-dot" size={30} color={NEGRO} />
            </Pressable>
            <Pressable onPress={handleOpenModalGestion}>
              <FontAwesome5 name="plus" color={NEGRO} size={30} />
            </Pressable>
          </View>
        </TouchableOpacity>
      </Card>
    ),
    [
      handleAbrirGps,
      handleCambiarPagina,
      handleOpenImagenes,
      handleOpenModalGestion,
    ]
  );

  return (
    <View style={styles.container}>
      <Header title="Gestiones" />
      <View style={styles.containerHeader}>
        <InputCustom
          placeholder="Buscar"
          styleContainer={styles.styleInput}
          leftIcon={
            <Ionicons
              name="search"
              color={AZUL}
              size={convertirTamanoHorizontal(25)}
            />
          }
        />
        <TouchableOpacity
          style={styles.buttonFiltro}
          onPress={handleOpenModalFiltros}
        >
          <FontAwesome name="filter" size={24} color={AZUL} />
        </TouchableOpacity>
      </View>
      <View style={styles.styleContainerCard}>
        <FlatList
          data={jsonGestiones}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(datos) => datos.cedulaCliente}
        />
      </View>
      {modalFiltros && (
        <ModalFiltros
          onClose={handleCloseModalFiltros}
          visible={modalFiltros}
        />
      )}
      {modalCarrucel && (
        <ModalCarrucelImagenes
          data={imagenes}
          onClose={handleCloseModalCarrucel}
          visible={modalCarrucel}
        />
      )}
      {modalGestionar && (
        <ModalRealizarGestion
          onClose={handleCloseModalGestion}
          visible={modalGestionar}
        />
      )}
    </View>
  );
};

export default GestionesPagePrincipal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    marginHorizontal: convertirTamanoHorizontal(35),
    marginVertical: convertirTamanoVertical(30),
    height: convertirTamanoVertical(60),
  },
  buttonFiltro: {
    backgroundColor: "white",
    borderRadius: convertirTamanoHorizontal(25),
    padding: convertirTamanoHorizontal(10),
    marginLeft: convertirTamanoHorizontal(10),
    width: convertirTamanoHorizontal(55),
    justifyContent: "center",
    alignItems: "center",
  },
  styleInput: {
    flex: 1,
  },
  styleContainerCard: {
    flex: 1,
    marginHorizontal: convertirTamanoHorizontal(35),
    paddingBottom: convertirTamanoVertical(10),
  },
  styleText: {
    fontSize: convertirTamanoHorizontal(14),
    fontWeight: "400",
  },
  rowCardStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  labelCardLeft: {
    width: convertirTamanoHorizontal(140),
    fontSize: convertirTamanoHorizontal(14),
    fontWeight: "500",
  },
  labelCardRight: {
    width: convertirTamanoHorizontal(160),
    fontSize: convertirTamanoHorizontal(14),
    color: GRIS,
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: convertirTamanoVertical(20),
  },
  cardStyle: {
    marginTop: convertirTamanoVertical(10),
  },
});
