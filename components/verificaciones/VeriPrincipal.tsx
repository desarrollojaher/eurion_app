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
import Select from "../commons/select/Select";

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
import { cabeceraVerificacionPrueba } from "@/helper/json/jsonCabeceraVerificacion";
import { IVerificacionPruebaCabecera } from "@/models/IVerificacionPrueba";
import { useVerificacionStore } from "@/helper/store/stroreVerificacion";

const VeriPrincipal = () => {
  const [openImagenes, setOpenImagenes] = useState(false);
  const [openGuardar, setOpenGuardar] = useState(false);

  const [nombre, setNombre] = useState("");

  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const router = useRouter();
  const { setDatos, setDatosDetalles } = useVerificacionStore();

  const handleLlamarPersona = useCallback(async (telefono: string) => {
    await Linking.openURL(`tel:${telefono}`);
  }, []);

  const handleOpenImagenes = useCallback(
    (data: IImagenCompleta[]) => {
      setImagenes(data);
      setOpenImagenes(true);
    },
    [setImagenes]
  );

  const handleOpenGuardar = useCallback((nombre: string) => {
    setNombre(nombre);
    setOpenGuardar(true);
  }, []);

  const handleChangePage = useCallback(
    (item: IVerificacionPruebaCabecera) => {
      setDatos(item);
      setDatosDetalles();
      router.push("/principal/verificaciones/verifcaciones-detalles");
    },
    [router, setDatos, setDatosDetalles]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IVerificacionPruebaCabecera; index: number }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={() => handleChangePage(item)}>
          <HeaderCard
            labelLeft={item.tipoVerificacion}
            labelRight={item.fechaVerificacion}
          />
          <Separador />
          <TextCard
            titulo={item.nombreCliente}
            subtitulo={item.cedulaCliente}
          />
          <Text style={styles.textDescripcion}>{item.direccionCliente}</Text>
          <Separador />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes(item.imagenes)}>
              <FontAwesome5 name="images" color={NEGRO} size={30} />
            </Pressable>
            <Pressable
              onPress={() => handleLlamarPersona(item.telefonoCliente)}
            >
              <FontAwesome5 name="phone-alt" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleOpenGuardar(item.nombreCliente)}>
              <FontAwesome5 name="plus" color={NEGRO} size={30} />
            </Pressable>
          </View>
        </TouchableOpacity>
      </Card>
    ),
    [
      handleChangePage,
      handleLlamarPersona,
      handleOpenGuardar,
      handleOpenImagenes,
    ]
  );

  const handleCerrarImagenes = useCallback(() => {
    setOpenImagenes(false);
  }, []);

  const handleCloseGuardar = useCallback(() => {
    setOpenGuardar(false);
  }, []);

  return (
    <View>
      <Header title="Verificaciones" />
      <View style={styles.container}>
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
        <Select
          datos={[
            { label: "TODOS", value: "todos" },
            { label: "VERIFICACION DOMICILIO", value: "domicilio" },
            { label: "VERIFICACION TRABAJO", value: "trabajo" },
          ]}
          defaultValue={{ label: "TODOS", value: "todos" }}
        />
        <FlatList
          style={{ height: convertirTamanoVertical(600) }}
          data={cabeceraVerificacionPrueba}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {openImagenes && (
        <ModalCarrucelImagenes
          data={imagenes}
          onClose={handleCerrarImagenes}
          visible={openImagenes}
        />
      )}
      {openGuardar && (
        <ModalRealizarVerificacion
          cliente={nombre}
          onClose={handleCloseGuardar}
          visible={openGuardar}
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
