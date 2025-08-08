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
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Separador from "@/components/commons/separador/Separador";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GRIS, GRIS_CLARO, ROJO, VERDE_CLARO } from "@/constants/Colors";
import ModalAlertaSubirEliminar from "../../commons/modal/ModalAlertaSubirEliminar";
import { useSubirInformacionObtener } from "@/service/SubirInformacion/useSubirInformacionObtener";
import EmptyList from "@/components/commons/FlatList/EmptyList";
import LoadingComponent from "@/components/commons/FlatList/LoadingComponent";
import { ISubirInformacion } from "@/models/ISubirInformacion";
import { useSubirGestionEliminar } from "@/service/SubirInformacion/useSubirGestionEliminar";
import { format, parseISO } from "date-fns";
import { SubirVerificacionUnica } from "@/service/SubirInformacion/subirVerificacionUnica";
import ModalError from "@/components/sincronizar/modal/ModalError";

const GestionesTab = () => {
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState<"subir" | "eliminar">("subir");

  const [gestion, setGestion] = useState<ISubirInformacion>();

  const {
    data: datosInformacion,
    isLoading: isLodingSubirInformacion,
    refetch: refetchSubirInformacion,
  } = useSubirInformacionObtener();

  const { subirVerificacion, onCloseError, error, errorMessage, loading } =
    SubirVerificacionUnica();

  const { mutate: eliminarGestion, isPending: isLoadingEliminaGestion } =
    useSubirGestionEliminar();

  // const {
  //   mutate: eliminarGestionVerificacion,
  //   isPending: isLoadingEliminaGestionVerificacion,
  // } = useSubirGestionEliminarVerificacion();

  const handleTabDelete = useCallback((datos: ISubirInformacion) => {
    setGestion(datos);
    setModalAlertaSubida(true);
    setTipoAlerta("eliminar");
  }, []);

  const handleTabUpload = useCallback((datos: ISubirInformacion) => {
    setGestion(datos);
    setModalAlertaSubida(true);
    setTipoAlerta("subir");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleEliminar = useCallback(() => {
    if (gestion) {
      if (gestion.factura === "VERIFICACION") {
        eliminarGestion(
          {
            calificacion: gestion.calificacion ?? "",
            factura: gestion.factura,
            identificacionCliente: gestion.identificacionCliente,
            modulo:
              gestion.factura === "VERIFICACION" ? "verificacion" : "gestion",
            tipoGestion: gestion.tipoGestion,
            id: gestion.id,
          },
          {
            onSuccess: () => {
              handleCloseModal();
            },
          },
        );
      }
      // else if (
      //   gestion.factura === "VERIFICACION" &&
      //   (gestion.calificacion === "ANULAR" ||
      //     gestion.calificacion === "REASIGNAR")
      // ) {
      //   eliminarGestionVerificacion(
      //     {
      //       calificacion: 0,
      //       identificacionCliente: gestion.identificacionCliente,
      //       reversar: true,
      //       codigoTipoGestion:
      //         gestion.tipoGestion === "VERIFICACION DOMICILIO" ? 1 : 2,
      //     },
      //     {
      //       onSuccess: () => {
      //         handleCloseModal();
      //       },
      //     }
      //   );
      // }
      if (gestion.factura !== "VERIFICACION") {
        eliminarGestion(
          {
            calificacion: "",
            factura: gestion.factura,
            identificacionCliente: gestion.identificacionCliente,
            modulo: "gestion",
            tipoGestion: gestion.tipoGestion,
            id: gestion.id,
          },
          {
            onSuccess: () => {
              handleCloseModal();
            },
          },
        );
      }
    }
  }, [eliminarGestion, gestion, handleCloseModal]);

  const handleSubir = useCallback(() => {
    if (gestion && gestion.factura === "VERIFICACION") {
      subirVerificacion(Number(gestion.id), handleCloseModal);
    }
  }, [gestion, handleCloseModal, subirVerificacion]);

  const renderItem = useCallback(
    ({ item, index }: { item: ISubirInformacion; index: number }) => (
      <Card>
        <HeaderCard
          labelLeft={item.cliente ?? ""}
          labelRight={format(parseISO(item.fecha ?? ""), "dd-MM-yyyy hh:mm:ss")}
          styleLeft={styles.styleLableLeft}
        />
        <Separador />
        <HeaderCard
          labelLeft="Tipo Gestion"
          labelRight={item.tipoGestion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Factura"
          labelRight={item.factura}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Observación"
          labelRight={item.observacion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        {item.factura === "VERIFICACION" && (
          <>
            <Separador color={GRIS_CLARO} />
            <HeaderCard
              labelLeft="Calificacion"
              labelRight={item.calificacion}
              styleLeft={styles.styleLabelLeft}
              styleRight={styles.styleLabelRigth}
            />
          </>
        )}
        <Separador />
        <View style={styles.containerBotones}>
          <Pressable
            style={styles.pressableStyle}
            onPress={() => handleTabDelete(item)}
          >
            <Icon
              name="trash"
              size={convertirTamanoHorizontal(30)}
              color={ROJO}
            />
          </Pressable>
          <Pressable
            style={styles.pressableStyle}
            onPress={() => handleTabUpload(item)}
          >
            <Icon
              name="upload"
              size={convertirTamanoHorizontal(30)}
              color={VERDE_CLARO}
            />
          </Pressable>
        </View>
      </Card>
    ),
    [handleTabDelete, handleTabUpload],
  );

  return (
    <View>
      <FlatList
        data={datosInformacion}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLodingSubirInformacion} />}
        ListFooterComponent={
          <LoadingComponent isLoading={isLodingSubirInformacion} />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLodingSubirInformacion}
            onRefresh={refetchSubirInformacion}
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
          isLoading={isLoadingEliminaGestion || loading}
        />
      )}
      {error && (
        <ModalError
          onClose={onCloseError}
          errorMessage={errorMessage}
          tabla={""}
          visible={error}
        />
      )}
    </View>
  );
};

export default GestionesTab;

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
    width: convertirTamanoHorizontal(140),
  },
  styleLabelRigth: {
    flex: 1,
    width: convertirTamanoHorizontal(140),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
  pressableStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoHorizontal(40),
    justifyContent: "center",
    alignItems: "center",
  },
  styleLableLeft: {
    width: convertirTamanoHorizontal(200),
  },
});
