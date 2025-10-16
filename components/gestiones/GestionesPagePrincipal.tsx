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
import { AZUL, GRIS, GRIS_CLARO } from "@/constants/Colors";
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
import ModalCarrucelImagenes from "../commons/carousel/ModalCarrucelImagenes";
import ModalRealizarGestion from "./modal/ModalRealizarGestion";
import { router } from "expo-router";
import { IGestionesCabecera } from "@/models/IGestiones";
import EmptyList from "../commons/FlatList/EmptyList";
import LoadingComponent from "../commons/FlatList/LoadingComponent";
import { formatCurrency } from "@/helper/function/numericas";
import { useDebounce } from "@/hooks/debounce";
import { useGestionStore } from "@/helper/store/storeGestiones";
import { useObtenerGestiones } from "@/service/Gestiones/useObtenerGestiones";
import { Toast } from "toastify-react-native";

const GestionesPagePrincipal = () => {
  const [modalCarrucel, setModalCarrucel] = useState(false);
  const [modalGestionar, setModalGestionar] = useState(false);
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);
  const [gestion, setGestion] = useState<IGestionesCabecera | null>(null);
  const [buscador, setBuscador] = useState("");

  const debouncedInputValue = useDebounce(buscador, 1000);

  const {
    data: dataGestionesCabecera,
    isLoading: isLoadingGestionesCabecera,
    refetch: refetchGestionesCabecera,
  } = useObtenerGestiones({ buscador: debouncedInputValue });

  const { setDatos } = useGestionStore();

  const handleOpenImagenes = useCallback((data: IGestionesCabecera) => {
    const imagenesLista: IImagenCompleta[] = [];
    if (data.imagenCliente) {
      imagenesLista.push({
        titulo: "FOTO CLIENTE",
        url: data.imagenCliente,
      });
    }
    if (data.imagenDomicilio) {
      imagenesLista.push({
        titulo: "FOTO DOMICILIO",
        url: data.imagenDomicilio,
      });
    }

    setImagenes(imagenesLista);
    setModalCarrucel(true);
  }, []);
  const handleAbrirGps = useCallback((data: IGestionesCabecera) => {
    if (
      data.latitudCliente &&
      data.longitudCliente &&
      data.latitudCliente !== null &&
      data.longitudCliente !== null
    ) {
      Linking.openURL(
        `geo:${data.latitudCliente},${data.longitudCliente}?q=${data.latitudCliente},${data.longitudCliente}`,
      );
    } else {
      Toast.error("El cliente no tiene coordenadas");
    }
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
    (item: IGestionesCabecera) => {
      setDatos(item);
      router.push("/principal/gestiones/gestiones-detalles");
    },
    [setDatos],
  );

  const handleSelecionar = useCallback(
    (item: IGestionesCabecera) => {
      setGestion(item);
      handleOpenModalGestion();
    },
    [handleOpenModalGestion],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IGestionesCabecera; index: number }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={() => handleCambiarPagina(item)}>
          <HeaderCard labelRight="Ruta" />
          <Separador />
          <TextCard
            titulo={`${item.apellidoCliente} ${item.nombreCliente}`}
            subtitulo={item.identificacion}
          />
          <Text style={styles.styleText}>{item.direccionCliente}</Text>
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
            labelRight={
              formatCurrency(Number(item?.deudaPendiente ?? "0")) ?? ""
            }
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

          <Separador />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes(item)}>
              <FontAwesome5 name="images" color={"green"} size={30} />
            </Pressable>
            <Pressable onPress={() => handleAbrirGps(item)}>
              <FontAwesome6 name="map-location-dot" size={30} color={AZUL} />
            </Pressable>
            <Pressable onPress={() => handleSelecionar(item)}>
              <FontAwesome5 name="plus" color={"green"} size={30} />
            </Pressable>
          </View>
        </TouchableOpacity>
      </Card>
    ),
    [handleAbrirGps, handleCambiarPagina, handleOpenImagenes, handleSelecionar],
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
      </View>
      <View style={styles.styleContainerCard}>
        <FlatList
          data={dataGestionesCabecera}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(datos) => datos.identificacion}
          ListEmptyComponent={
            <EmptyList isLoading={isLoadingGestionesCabecera} />
          }
          ListFooterComponent={
            <LoadingComponent isLoading={isLoadingGestionesCabecera} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingGestionesCabecera}
              onRefresh={refetchGestionesCabecera}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
        />
      </View>
      {modalCarrucel && (
        <ModalCarrucelImagenes
          data={imagenes}
          onClose={handleCloseModalCarrucel}
          visible={modalCarrucel}
        />
      )}
      {modalGestionar && gestion && (
        <ModalRealizarGestion
          onClose={handleCloseModalGestion}
          visible={modalGestionar}
          datos={gestion}
          seccion="cabecera"
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
    marginHorizontal: convertirTamanoHorizontal(35),
    marginVertical: convertirTamanoVertical(30),
    height: convertirTamanoVertical(60),
  },
  styleInput: {
    width: "100%",
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
    borderWidth: 2,
    borderColor: GRIS_CLARO,
  },
});
