import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import {
  Control,
  FieldArrayWithId,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import CardReciboTabTipoPago from "./render/CardReciboTabTipoPago";
import { IDatosSelect } from "../commons/select/Select";
import LottieAnimation from "../commons/lottie/LottieAnimation";
import { BLANCO } from "@/constants/Colors";
import { useFormaPagoObtener } from "@/service/FormasPago/useFormaPagoObtener";

interface PropsReciboTabTipoPago {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  watch: UseFormWatch<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  getValues: UseFormGetValues<IReciboEnviarDatos>;
}

const ReciboTabTipoPago: React.FC<PropsReciboTabTipoPago> = ({
  datosDocumentos,
  watch,
  control,
  getValues,
}) => {
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

  const renderItem = useCallback(
    ({ item, index }: { item: IReciboEnviar; index: number }) => (
      <CardReciboTabTipoPago
        item={item}
        watch={watch}
        control={control}
        formasPago={formasPago}
        datosDocumentos={datosDocumentos}
        dataFormasPago={dataFormasPago}
      />
    ),
    [control, dataFormasPago, datosDocumentos, formasPago, watch],
  );

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
