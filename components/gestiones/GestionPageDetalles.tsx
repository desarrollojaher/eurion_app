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
import GestionesPageDetallesDireccion, {
  PropsGestionesPageDetallesDireccionRef,
} from "./GestionesPageDetallesDireccion";
import { useGestionStore } from "@/helper/store/storeGestiones";

const GestionPageDetalles = () => {
  const [modalGestionar, setModalGestionar] = useState(false);
  const [tab, setTab] = useState(0);

  const { datos } = useGestionStore();

  const gestionDireccion =
    React.useRef<PropsGestionesPageDetallesDireccionRef>(null);

  const tabs = useMemo(() => ["Cliente", "Documentos", "Actualización"], []);

  const tabCorrespondiente = useMemo(() => {
    if (tabs[tab] === "Cliente") {
      return (
        <GestionPageDetallesCliente
          identificacionCliente={datos?.identificacionCliente ?? ""}
        />
      );
    } else if (tabs[tab] === "Documentos" && datos) {
      return <GestionesPageDetallesDocumenos datos={datos} />;
    } else if (tabs[tab] === "Actualización" && datos) {
      return (
        <GestionesPageDetallesDireccion datos={datos} ref={gestionDireccion} />
      );
    }
  }, [datos, tab, tabs]);

  const tabIcon = useMemo(() => {
    if (tabs[tab] === "Actualización") {
      return "save";
    }
    return "plus";
  }, [tab, tabs]);

  const handleGuardarDireccion = useCallback(() => {
    if (gestionDireccion.current) {
      gestionDireccion.current.handleSubmit();
    }
  }, []);

  const handleOpenModalGestion = useCallback(() => {
    if (tabs[tab] === "Actualización") {
      handleGuardarDireccion();
      return;
    }
    setModalGestionar(true);
  }, [handleGuardarDireccion, tab, tabs]);

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
      <Footer items={tabs} setTab={setTab} indexSeleccionado={tab} />

      {modalGestionar && datos && (
        <ModalRealizarGestion
          onClose={handleCloseModalGestion}
          visible={modalGestionar}
          datos={datos}
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
