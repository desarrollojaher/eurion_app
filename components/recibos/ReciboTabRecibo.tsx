import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
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
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import LottieAnimation from "../commons/lottie/LottieAnimation";
import { BLANCO } from "@/constants/Colors";

interface PropsReciboTabRecibo {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  watch: UseFormWatch<IReciboEnviarDatos>;
  setValue: UseFormSetValue<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  getValues: UseFormGetValues<IReciboEnviarDatos>;
}

const ReciboTabRecibo: React.FC<PropsReciboTabRecibo> = ({
  datosDocumentos,
  watch,
  setValue,
  control,
  getValues,
}) => {
  const [modalCamara, setModalCamara] = useState(false);
  const [index, setIndex] = useState(0);
  const imagenes = watch(`datos.${index}.imagenes`);

  // const { data: dataFormasPagos } = useRecibosFormaPago();

  const itemsCambios = useMemo(() => {
    if (datosDocumentos.length > 0) {
      const d: IReciboEnviar[] = [];
      for (let index = 0; index < datosDocumentos.length; index++) {
        const datos = getValues(`datos.${index}`);
        if (
          (datos.valorCancela !== null && datos.valorCancela !== "") ||
          (datos.valorCobranza !== null && datos.valorCobranza !== "") ||
          (datos.valorMora !== null && datos.valorMora !== "")
        ) {
          d.push(datos);
        }
      }
      return d;
    }
    return [];
  }, [datosDocumentos, getValues]);

  const animation = useMemo(() => {
    return require("../../assets/animations/empty.json");
  }, []);

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
        dataFormasPagos={[]}
        datosDocumentos={datosDocumentos}
      />
    ),
    [control, datosDocumentos, handleOpenModalCamara, watch]
  );

  return (
    <View>
      <FlatList
        data={itemsCambios}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.doctran}
        ListEmptyComponent={() => (
          <View style={styles.styleSinInfo}>
            <LottieAnimation resource={animation} />
            <Text style={styles.styleText}>No a ingresado ningun valor</Text>
          </View>
        )}
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
  styleSinInfo: {
    marginTop: convertirTamanoVertical(40),
    height: convertirTamanoVertical(240),
    width: convertirTamanoHorizontal(345),
    alignSelf: "center",
  },
  styleText: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "bold",
    color: BLANCO,
    textAlign: "center",
  },
});
