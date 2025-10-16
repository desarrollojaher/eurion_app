import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import {
  Control,
  FieldArrayWithId,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import CardReciboTabTipoPago from "./render/CardReciboTabTipoPago";
import { IDatosSelect } from "../commons/select/Select";
import LottieAnimation from "../commons/lottie/LottieAnimation";
import { BLANCO } from "@/constants/Colors";
import { useFormaPagoObtener } from "@/service/FormasPago/useFormaPagoObtener";
import Camara from "../commons/camera/Camara";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import { IComprobanteObtener } from "@/models/IComprobante";

interface PropsReciboTabTipoPago {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  watch: UseFormWatch<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  getValues: UseFormGetValues<IReciboEnviarDatos>;
  setValue: UseFormSetValue<IReciboEnviarDatos>;
  datos: IComprobanteObtener[];
}

const ReciboTabTipoPago: React.FC<PropsReciboTabTipoPago> = ({
  datosDocumentos,
  watch,
  control,
  getValues,
  setValue,
  datos,
}) => {
  const [modalCamara, setModalCamara] = useState(false);
  const [indexImg, setIndexImg] = useState(0);
  const [imagen, setImagen] = useState<IImagenCompleta>();

  const { data: dataFormasPago } = useFormaPagoObtener();
  const formasPago = useMemo(() => {
    const datos: IDatosSelect[] = [];
    dataFormasPago?.map((item) => {
      datos.push({
        label: item.fpNombre ?? "",
        value: item.fpId?.toString() ?? "",
      });
    });
    return datos;
  }, [dataFormasPago]);

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
    setIndexImg(index);
    setModalCamara(true);
  }, []);

  const handleEliminarImagen = useCallback(() => {
    setImagen(undefined);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IReciboEnviar; index: number }) => (
      <CardReciboTabTipoPago
        item={item}
        watch={watch}
        control={control}
        formasPago={formasPago}
        datosDocumentos={datosDocumentos}
        dataFormasPago={dataFormasPago}
        handleOpenModalCamara={handleOpenModalCamara}
        indexCard={index}
        imagen={index === indexImg ? imagen : undefined}
        handleEliminarImagen={handleEliminarImagen}
        datos={datos}
      />
    ),
    [
      control,
      dataFormasPago,
      datos,
      datosDocumentos,
      formasPago,
      handleEliminarImagen,
      handleOpenModalCamara,
      imagen,
      indexImg,
      watch,
    ],
  );

  const handleGuardarImagenes = useCallback((data: IImagenCompleta[]) => {
    setImagen(data[0]);
    setModalCamara(false);
  }, []);

  const handleCloseModalCamara = useCallback(() => {
    setModalCamara(false);
  }, []);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <FlatList
        data={itemsCambios}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.doctran}
        scrollEnabled={false}
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
          cantidadMaxima={1}
        />
      )}
    </ScrollView>
  );
};

export default ReciboTabTipoPago;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
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
