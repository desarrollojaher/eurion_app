import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { IImagenCompleta } from "@/models/IImagenCompleta";

import Camara from "../commons/camera/Camara";
import CardReciboTabRecibo from "./render/CardReciboTabRecibo";
import {
  Control,
  FieldArrayWithId,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import { useRecibosFormaPago } from "@/service/Recibos/useRecibosFormaPago";

interface PropsReciboTabRecibo {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  watch: UseFormWatch<IReciboEnviarDatos>;
  setValue: UseFormSetValue<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
}

const ReciboTabRecibo: React.FC<PropsReciboTabRecibo> = ({
  datosDocumentos,
  watch,
  setValue,
  control,
}) => {
  const [modalCamara, setModalCamara] = useState(false);
  const [index, setIndex] = useState(0);
  const imagenes = watch(`datos.${index}.imagenes`);

  const { data: dataFormasPagos } = useRecibosFormaPago();

  const handleOpenModalCamara = useCallback((index: number) => {
    setIndex(index);
    setModalCamara(true);
  }, []);

  const handleGuardarImagenes = useCallback(
    (data: IImagenCompleta[]) => {
      const union = imagenes?.concat(data);
      setValue(`datos.${index}.imagenes`, union);
      setModalCamara(false);
    },
    [imagenes, index, setValue]
  );

  const handleCloseModalCamara = useCallback(() => {
    setModalCamara(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Partial<IReciboEnviar>; index: number }) => (
      <CardReciboTabRecibo
        index={index}
        item={item}
        watch={watch}
        handleOpenModalCamara={handleOpenModalCamara}
        control={control}
        dataFormasPagos={dataFormasPagos}
      />
    ),
    [control, dataFormasPagos, handleOpenModalCamara, watch]
  );

  return (
    <View>
      <FlatList
        data={datosDocumentos}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.doctran}
      />
      {modalCamara && (
        <Camara
          handleCaptureImage={handleGuardarImagenes}
          onClose={handleCloseModalCamara}
          visible={modalCamara}
        />
      )}
    </View>
  );
};

export default ReciboTabRecibo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
  },

  styleInput: {
    height: convertirTamanoVertical(50),
    width: convertirTamanoHorizontal(185),
  },
});
