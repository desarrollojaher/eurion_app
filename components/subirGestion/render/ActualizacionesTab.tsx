import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GRIS, GRIS_CLARO, NEGRO } from "@/constants/Colors";
import { useSubirInformacionActualizacionesObtener } from "@/service/SubirInformacion/useSubirInformacionActualizacionesObtener";
import EmptyList from "@/components/commons/FlatList/EmptyList";
import LoadingComponent from "@/components/commons/FlatList/LoadingComponent";
import { ISubirInformacionActualizaciones } from "@/models/ISubirInformacion";
import { useSubirGestionEliminarActualizaciones } from "@/service/SubirInformacion/useSubirGestionEliminarActualizaciones";
import ModalAlertaSubirEliminar from "@/components/commons/modal/ModalAlertaSubirEliminar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import ModalCarrucelImagenes from "@/components/commons/carousel/ModalCarrucelImagenes";

const ActualizacionesTab = () => {
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);
  const [actualizacion, setActualizacion] =
    useState<ISubirInformacionActualizaciones | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"subir" | "eliminar">("subir");
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);
  const [modalCarrucel, setModalCarrucel] = useState(false);

  const {
    data: dataActualizaciones,
    isLoading,
    refetch,
  } = useSubirInformacionActualizacionesObtener();

  const { mutate: eliminarActualizacion, isPending: isLoadingElimina } =
    useSubirGestionEliminarActualizaciones();

  const handleTabDelete = useCallback(
    (item: ISubirInformacionActualizaciones) => {
      setModalAlertaSubida(true);
      setTipoAlerta("eliminar");
      setActualizacion(item);
    },
    []
  );

  const handleTabUpload = useCallback(() => {
    console.log("handleTabUpload");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleEliminar = useCallback(() => {
    if (actualizacion) {
      eliminarActualizacion(actualizacion);
    }
    setModalAlertaSubida(false);
  }, [actualizacion, eliminarActualizacion]);

  const handleCloseModalCarrucel = useCallback(() => {
    setModalCarrucel(false);
  }, []);

  const handleOpenImagenes = useCallback(
    (data: ISubirInformacionActualizaciones) => {
      setImagenes(data.imagenes ?? []);
      setModalCarrucel(true);
    },
    []
  );

  const handleSubir = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item }: { item: ISubirInformacionActualizaciones }) => (
      <Card>
        <HeaderCard labelLeft={item.nombre ?? ""} labelRight={item.fecha} />
        <Separador />
        <HeaderCard
          labelLeft="Dirección"
          labelRight={item.direccion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Dirección Adicional"
          labelRight={item.direccionAdicional}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Latitud"
          labelRight={item.latitud?.toString() ?? ""}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Longitud"
          labelRight={item.longitud?.toString() ?? ""}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador />
        <View style={styles.containerBotones}>
          <Pressable onPress={() => handleOpenImagenes(item)}>
            <FontAwesome5 name="images" color={NEGRO} size={30} />
          </Pressable>
          <Pressable
            style={styles.pressableStyle}
            onPress={() => handleTabDelete(item)}
          >
            <Icon name="trash" size={convertirTamanoHorizontal(30)} />
          </Pressable>
          <Pressable style={styles.pressableStyle} onPress={handleTabUpload}>
            <Icon name="upload" size={convertirTamanoHorizontal(30)} />
          </Pressable>
        </View>
      </Card>
    ),
    [handleOpenImagenes, handleTabDelete, handleTabUpload]
  );
  return (
    <View>
      <FlatList
        data={dataActualizaciones}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(datos) => datos.identificacionCliente ?? ""}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        ListFooterComponent={<LoadingComponent isLoading={isLoading} />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      />
      {modalAlertaSubida && (
        <ModalAlertaSubirEliminar
          onClose={handleCloseModal}
          visible={modalAlertaSubida}
          tipo={tipoAlerta}
          handleEliminar={handleEliminar}
          handleSubir={handleSubir}
          isLoading={isLoadingElimina}
        />
      )}
      {modalCarrucel && (
        <ModalCarrucelImagenes
          data={imagenes}
          onClose={handleCloseModalCarrucel}
          visible={modalCarrucel}
        />
      )}
    </View>
  );
};

export default ActualizacionesTab;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: convertirTamanoVertical(10),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(120),
  },
  styleLabelRigth: {
    flex: 1,
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
    width: convertirTamanoHorizontal(210),
  },
  pressableStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoHorizontal(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
