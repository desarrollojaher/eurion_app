import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Footer from "../commons/footer/Footer";
import Header from "../commons/header/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BLANCO } from "@/constants/Colors";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";
import ModalRealizarGestion from "./modal/ModalRealizarGestion";
import GestionPageDetallesCliente from "./GestionPageDetallesCliente";
import GestionesPageDetallesDocumenos from "./GestionesPageDetallesDocumenos";
import GestionesPageDetallesDireccion from "./GestionesPageDetallesDireccion";
import { Toast } from "toastify-react-native";
import { useGestionStore } from "@/helper/store/storeGestiones";

const GestionPageDetalles = () => {
  const [modalGestionar, setModalGestionar] = useState(false);
  const [tab, setTab] = useState(0);

  const { datos } = useGestionStore();

  const tabs = useMemo(() => ["Cliente", "Documentos", "Dirección"], []);

  const tabCorrespondiente = useMemo(() => {
    if (tabs[tab] === "Cliente") {
      return <GestionPageDetallesCliente />;
    } else if (tabs[tab] === "Documentos") {
      return <GestionesPageDetallesDocumenos />;
    } else {
      return <GestionesPageDetallesDireccion />;
    }
  }, [tab, tabs]);

  const tabIcon = useMemo(() => {
    if (tabs[tab] === "Dirección") {
      return "save";
    }
    return "plus";
  }, [tab, tabs]);

  const handleOpenModalGestion = useCallback(() => {
    if (tabs[tab] === "Dirección") {
      Toast.success("Datos actualizados");
      return;
    }
    setModalGestionar(true);
  }, [tab, tabs]);

  const handleCloseModalGestion = useCallback(() => {
    setModalGestionar(false);
  }, []);

  return (
    <View style={styles.containerGeneral}>
      <Header
        title={datos?.apellidos + " " + datos?.nombres}
        iconRight={
          <TouchableOpacity onPress={handleOpenModalGestion}>
            <Icon
              name={tabIcon}
              color={BLANCO}
              size={convertirTamanoHorizontal(30)}
            />
          </TouchableOpacity>
        }
      />
      {tabCorrespondiente}
      <Footer items={tabs} setTab={setTab} />

      {modalGestionar && (
        <ModalRealizarGestion
          onClose={handleCloseModalGestion}
          visible={modalGestionar}
        />
      )}
    </View>
  );
};

export default GestionPageDetalles;

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
  },
});
