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
import Select, { IDatosSelect } from "../commons/select/Select";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import InputCustom from "../commons/input/InputCustom";
import { AZUL, NEGRO } from "@/constants/Colors";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import Separador from "../commons/separador/Separador";
import TextCard from "../commons/card/TextCard";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import ModalCarrucelImagenes from "../commons/carousel/ModalCarrucelImagenes";
import ModalRealizarVerificacion from "./modal/ModalRealizarVerificacion";
import { useRouter } from "expo-router";
import { useVerificacionStore } from "@/helper/store/stroreVerificacion";
import { useObtenerVerificacionesCabecera } from "@/service/Verificaciones/useObtenerVerificacionesCabecera";
import { IVerificacionesCabecera } from "@/models/IVerificaciones";
import { useDebounce } from "@/hooks/debounce";
import { format } from "date-fns";
import LoadingComponent from "../commons/FlatList/LoadingComponent";
import EmptyList from "../commons/FlatList/EmptyList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ModalError from "../sincronizar/modal/ModalError";

const VeriPrincipal = () => {
  const [openImagenes, setOpenImagenes] = useState(false);
  const [openGuardar, setOpenGuardar] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [cliente, setCliente] = useState<IVerificacionesCabecera>();
  const [filtro, setFiltro] = useState("");
  const [filtroRuta, setFiltroRuta] = useState<string | null>(null);

  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const router = useRouter();
  const { setDatos } = useVerificacionStore();
  const debouncedInputValue = useDebounce(filtro, 1000);

  const {
    data: dataVerificacionesCabecera,
    isLoading: isLoadingVerificacionesCabecera,
    refetch: refetchVerificaciones,
  } = useObtenerVerificacionesCabecera({
    nombreCliente: debouncedInputValue,
    tipoRuta: filtroRuta,
  });

  const handleLlamarPersona = useCallback(async (telefono: string) => {
    await Linking.openURL(`tel:${telefono}`);
  }, []);

  const handleOpenImagenes = useCallback((item: IVerificacionesCabecera) => {
    const imagenesLista: IImagenCompleta[] = [];
    if (item.fotoCliente) {
      imagenesLista.push({
        titulo: "FOTO CLIENTE",
        url: item.fotoCliente.split(",")[1],
      });
    }
    if (item.fotoDomicilio) {
      imagenesLista.push({
        titulo: "FOTO DOMICILIO",
        url: item.fotoDomicilio.split(",")[1],
      });
    }

    setImagenes(imagenesLista);
    setOpenImagenes(true);
  }, []);

  const handleOpenGuardar = useCallback((cliente: IVerificacionesCabecera) => {
    setCliente(cliente);
    setOpenGuardar(true);
  }, []);

  const handleOpenGoogleMaps = useCallback(
    (cliente: IVerificacionesCabecera) => {
      if (cliente.latitud && cliente.longitud) {
        Linking.openURL(
          `geo:${cliente.latitud},${cliente.longitud}?q=${cliente.latitud},${cliente.longitud}`,
        );
      } else {
        setOpenError(true);
      }
    },
    [],
  );

  const handleChangePage = useCallback(
    (item: IVerificacionesCabecera) => {
      setDatos(item);
      router.push("/principal/verificaciones/verifcaciones-detalles");
    },
    [router, setDatos],
  );

  const renderItem = useCallback(
    ({ item }: { item: IVerificacionesCabecera }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={() => handleChangePage(item)}>
          <HeaderCard
            labelLeft={item.codigoTipoDeRuta}
            labelRight={format(item.fecha, "dd-MM-yyyy")}
          />
          <Separador />
          <TextCard
            titulo={`${item.apellidos} ${item.nombres}`}
            subtitulo={item.identificacion}
          />
          <Text style={styles.textDescripcion}>
            {item.codigoTipoDeRuta === "Domiciliaria"
              ? item.direccion
              : item.direccionTrabajo}
          </Text>
          <Separador />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes(item)}>
              <FontAwesome5 name="images" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleLlamarPersona(item.telefono)}>
              <FontAwesome5 name="phone-alt" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleOpenGoogleMaps(item)}>
              <FontAwesome6 name="map-location-dot" size={30} color={NEGRO} />
            </Pressable>
            <Pressable onPress={() => handleOpenGuardar(item)}>
              <FontAwesome5 name="plus" color={NEGRO} size={30} />
            </Pressable>
          </View>
        </TouchableOpacity>
      </Card>
    ),
    [
      handleChangePage,
      handleLlamarPersona,
      handleOpenGoogleMaps,
      handleOpenGuardar,
      handleOpenImagenes,
    ],
  );

  const handleCerrarImagenes = useCallback(() => {
    setOpenImagenes(false);
  }, []);

  const handleCloseGuardar = useCallback(() => {
    setOpenGuardar(false);
  }, []);

  const handleCloseError = useCallback(() => {
    setOpenError(false);
  }, []);

  const handleSelect = useCallback((value: IDatosSelect) => {
    if (value.value === "todos") {
      setFiltroRuta(null);
    } else {
      setFiltroRuta(value.value);
    }
  }, []);

  return (
    <View>
      <Header title="Verificaciones" />
      <View style={styles.container}>
        <InputCustom
          placeholder="Buscar"
          styleContainer={styles.styleInput}
          onChangeText={setFiltro}
          leftIcon={
            <Ionicons
              name="search"
              color={AZUL}
              size={convertirTamanoHorizontal(25)}
            />
          }
        />
        <Select
          onSelect={handleSelect}
          datos={[
            { label: "TODOS", value: "todos" },
            { label: "VERIFICACION DOMICILIO", value: "Domiciliaria" },
            { label: "VERIFICACION TRABAJO", value: "Laboral" },
          ]}
          defaultValue={{ label: "TODOS", value: "todos" }}
        />
        <FlatList
          style={{ height: convertirTamanoVertical(600) }}
          data={dataVerificacionesCabecera}
          keyExtractor={(item, index) => item.identificacion + index}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList isLoading={isLoadingVerificacionesCabecera} />
          }
          ListFooterComponent={
            <LoadingComponent isLoading={isLoadingVerificacionesCabecera} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingVerificacionesCabecera}
              onRefresh={refetchVerificaciones}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
        />
      </View>
      {openImagenes && (
        <ModalCarrucelImagenes
          data={imagenes}
          onClose={handleCerrarImagenes}
          visible={openImagenes}
        />
      )}
      {openGuardar && cliente && (
        <ModalRealizarVerificacion
          cliente={cliente}
          onClose={handleCloseGuardar}
          visible={openGuardar}
          seccion="cabecera"
        />
      )}
      {openError && (
        <ModalError
          errorMessage="No existe coordenadas para esta verificación"
          onClose={handleCloseError}
          visible={openError}
          tabla=""
        />
      )}
    </View>
  );
};

export default VeriPrincipal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: convertirTamanoHorizontal(35),
    marginTop: convertirTamanoVertical(49),
    gap: convertirTamanoVertical(23),
  },
  styleInput: {
    width: "100%",
  },
  textDescripcion: {
    fontSize: convertirTamanoHorizontal(12),
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: convertirTamanoVertical(15),
  },
  cardStyle: {
    marginTop: convertirTamanoVertical(23),
  },
});
