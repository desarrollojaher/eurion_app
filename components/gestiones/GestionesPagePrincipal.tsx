import {
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
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
import ModalFiltros from "./modal/ModalFiltros";
import ModalCarrucelImagenes from "../commons/carousel/ModalCarrucelImagenes";
import ModalRealizarGestion from "./modal/ModalRealizarGestion";
import { router } from "expo-router";
import { useObtenerGestionesCabecera } from "@/service/gestiones/useObtenerGestionesCabecera";
import { IGestiones } from "@/models/IGestiones";
import EmptyList from "../commons/FlatList/EmptyList";
import LoadingComponent from "../commons/FlatList/LoadingComponent";
import { formatCurrency } from "@/helper/function/numericas";
import { useDebounce } from "@/hooks/debounce";
import { useGestionStore } from "@/helper/store/storeGestiones";

const GestionesPagePrincipal = () => {
  const [modalFiltros, setModalFiltros] = useState(false);
  const [modalCarrucel, setModalCarrucel] = useState(false);
  const [modalGestionar, setModalGestionar] = useState(false);
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);
  const [buscador, setBuscador] = useState("");
  const [zona, setZona] = useState("todos");
  const [tipo, setTipo] = useState("todos");

  const debouncedInputValue = useDebounce(buscador, 1000);

  const {
    data: datosGestiones,
    isLoading: isLoadingGestiones,
    refetch: refechGestiones,
  } = useObtenerGestionesCabecera({
    buscador: debouncedInputValue,
    tipo: tipo,
    zona: zona,
  });

  const { setDatos } = useGestionStore();

  const handleOpenImagenes = useCallback((data: IGestiones) => {
    const imagenesLista: IImagenCompleta[] = [];
    if (data.imagenCliente) {
      imagenesLista.push({
        titulo: "FOTO CLIENTE",
        url: data.imagenCliente.split(",")[1],
      });
    }
    if (data.imagenDomicilio) {
      imagenesLista.push({
        titulo: "FOTO DOMICILIO",
        url: data.imagenDomicilio.split(",")[1],
      });
    }

    setImagenes(imagenesLista);
    setModalCarrucel(true);
  }, []);
  const handleAbrirGps = useCallback((data: IGestiones) => {
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

  const handleCambiarPagina = useCallback(
    (item: IGestiones) => {
      setDatos(item);
      router.push("/principal/gestiones/gestiones-detalles");
    },
    [setDatos]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IGestiones; index: number }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={() => handleCambiarPagina(item)}>
          <HeaderCard labelRight="Ruta" />
          <Separador />
          <TextCard
            titulo={`${item.apellidos} ${item.nombres}`}
            subtitulo={item.identificacionCliente}
          />
          <Text style={styles.styleText}>{item.direccion}</Text>
          <Separador />
          <HeaderCard
            labelLeft="DEUDA TOTAL"
            labelRight={formatCurrency(Number(item?.deudaTotal ?? "0")) ?? ""}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="VENCIDO"
            labelRight={formatCurrency(Number(item?.saldoVencido ?? "0")) ?? ""}
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
            labelRight={item.zonaNombre}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes(item)}>
              <FontAwesome5 name="images" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleAbrirGps(item)}>
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
          onChangeText={setBuscador}
          value={buscador}
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
          data={datosGestiones}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(datos) => datos.identificacionCliente}
          ListEmptyComponent={<EmptyList isLoading={isLoadingGestiones} />}
          ListFooterComponent={
            <LoadingComponent isLoading={isLoadingGestiones} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingGestiones}
              onRefresh={refechGestiones}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
        />
      </View>
      {modalFiltros && (
        <ModalFiltros
          onClose={handleCloseModalFiltros}
          visible={modalFiltros}
          setZona={setZona}
          zona={zona}
          setTipo={setTipo}
          tipo={tipo}
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
