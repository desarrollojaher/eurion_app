import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Separador from "@/components/commons/separador/Separador";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "@/components/commons/card/TextInput";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import Camara from "@/components/commons/camera/Camara";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import CarouselImagenes from "@/components/commons/carousel/CarouselImagenes";

interface PropsModalRealizarVerificacion {
  visible: boolean;
  onClose: () => void;
  cliente: string;
}

const ModalRealizarVerificacion: React.FC<PropsModalRealizarVerificacion> = ({
  onClose,
  visible,
  cliente,
}) => {
  const [visibleCamara, setVisibleCamara] = useState(false);
  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const onOpenCamara = useCallback(() => {
    setVisibleCamara(true);
  }, []);

  const onCloseCamara = useCallback(() => {
    setVisibleCamara(false);
  }, []);

  const handleCaptureImage = useCallback((images: IImagenCompleta[]) => {
    setImagenes(images);
  }, []);

  const handleRemoveImage = useCallback((indexElemento: string) => {
    console.log("indexElemento", indexElemento);
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo={cliente}>
      <View style={styles.container}>
        {imagenes.length > 0 ? (
          <CarouselImagenes
            data={imagenes}
            width={convertirTamanoHorizontal(330)}
            paginacion={true}
            handleRemoveImage={handleRemoveImage}
            modulo="camara"
          />
        ) : (
          <Pressable onPress={onOpenCamara}>
            <Icon name="camera" size={convertirTamanoHorizontal(80)} />
          </Pressable>
        )}
      </View>
      <Separador />
      <TextInput
        text={"Calificación: "}
        keyboardType="numeric"
        tipo="select"
        placeholder="Seleccione"
        datos={[
          { label: "POSITIVA", value: "positiva" },
          { label: "NEGATIVA", value: "negativa" },
          { label: "REASIGNAR", value: "reasignar" },
          { label: "ANULAR", value: "anular" },
        ]}
      />
      <TextInput
        text={"Calificación: "}
        tipo="text"
        multiline
        direction="column"
        placeholder="Observaciones"
        styleContainer={styles.containerObservaciones}
      />
      <ButtonCustom label="Guardar" style={styles.buttonStyle} />
      {visibleCamara && (
        <Camara
          onClose={onCloseCamara}
          visible={visibleCamara}
          handleCaptureImage={handleCaptureImage}
        />
      )}
    </ModalCustom>
  );
};

export default ModalRealizarVerificacion;

const styles = StyleSheet.create({
  container: {
    height: convertirTamanoVertical(200),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerObservaciones: {
    justifyContent: "flex-start",
    marginTop: convertirTamanoVertical(10),
    alignItems: "flex-start",
    gap: convertirTamanoVertical(5),
  },
  buttonStyle: {
    marginTop: convertirTamanoVertical(10),
    alignSelf: "center",
  },
});
