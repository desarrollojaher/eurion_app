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

const VeriPrincipal = () => {
  const [openImagenes, setOpenImagenes] = useState(false);
  const [openGuardar, setOpenGuardar] = useState(false);

  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const router = useRouter();

  const handleLlamarPersona = useCallback(async (telefono: string) => {
    await Linking.openURL(`tel:${telefono}`);
  }, []);

  const handleOpenImagenes = useCallback(
    (data: IImagenCompleta[]) => {
      setImagenes([
        {
          titulo: "imagen1",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmCTuSXDYOST7RSIGtE_1Dm5cONyi2OsZvg&s",
        },
        {
          titulo: "imagen2",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBIayrHifILdPMYmacWqWfgTZD4eFBgPZP3A&s",
        },
      ]);
      setOpenImagenes(true);
    },
    [setImagenes]
  );

  const handleOpenGuardar = useCallback(() => {
    setOpenGuardar(true);
  }, []);

  const handleChangePage = useCallback(() => {
    router.push("/principal/verificaciones/verifcaciones-detalles");
  }, [router]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Card style={styles.cardStyle}>
        <TouchableOpacity onPress={handleChangePage}>
          <HeaderCard
            labelLeft="VERIFICACION DOMICILIO"
            labelRight="04-03-2025"
          />
          <Separador />
          <TextCard
            titulo="AREVALO RIVAS FAUSTO GEOVANY"
            subtitulo="010254555-5"
          />
          <Text style={styles.textDescripcion}>
            DOM CRISTOBAL COLON 1 DOCE DE OCTUBRE CASA DE 3 PISOS COLOR CREA
          </Text>
          <Separador />
          <View style={styles.containerIcons}>
            <Pressable onPress={() => handleOpenImagenes([])}>
              <FontAwesome5 name="images" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={() => handleLlamarPersona("0968718441")}>
              <FontAwesome5 name="phone-alt" color={NEGRO} size={30} />
            </Pressable>
            <Pressable onPress={handleOpenGuardar}>
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
          cliente="Byron Godoy"
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
