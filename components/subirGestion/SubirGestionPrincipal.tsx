import { StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Header from "../commons/header/Header";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import Footer from "../commons/footer/Footer";
import GestionesTab from "./render/GestionesTab";
import ActualizacionesTab from "./render/ActualizacionesTab";
import RecibosTab from "./render/RecibosTab";
import ModalAlertaSubirEliminar from "../commons/modal/ModalAlertaSubirEliminar";

const SubirGestionPrincipal = () => {
  const [index, setIndex] = useState(0);
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);

  const tabs = useMemo(() => ["Gestiones", "Recibos"], []);

  const renderTab = useMemo(() => {
    if (tabs[index] === "Gestiones") {
      return <GestionesTab />;
    }
    if (tabs[index] === "Actualizaciones") {
      return <ActualizacionesTab />;
    }
    if (tabs[index] === "Recibos") {
      return <RecibosTab />;
    }
  }, [index, tabs]);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleTapSave = useCallback(() => {
    setModalAlertaSubida(true);
  }, []);

  const handleGuardarDatos = useCallback(() => {
    console.log("Datos guardados");
  }, []);
  return (
    <View style={styles.constainerGeneral}>
      <Header
        title="Subir Información"
        // iconRight={
        //   <Icon
        //     name="save"
        //     color={BLANCO}
        //     size={convertirTamanoHorizontal(30)}
        //   />
        // }
        handleTapIconRight={handleTapSave}
      />
      <View style={styles.containerBody}>{renderTab}</View>
      <Footer items={tabs} setTab={setIndex} indexSeleccionado={index} />
      {modalAlertaSubida && (
        <ModalAlertaSubirEliminar
          onClose={handleCloseModal}
          visible={modalAlertaSubida}
          subidaGeneral
          handleSubir={handleGuardarDatos}
          isLoading={false}
        />
      )}
    </View>
  );
};

export default SubirGestionPrincipal;

const styles = StyleSheet.create({
  constainerGeneral: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    marginBottom: convertirTamanoVertical(10),
    marginTop: convertirTamanoVertical(20),
  },
});
