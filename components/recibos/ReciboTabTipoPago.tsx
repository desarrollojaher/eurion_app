import { FlatList, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import { Control, FieldArrayWithId, UseFormWatch } from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import CardReciboTabTipoPago from "./render/CardReciboTabTipoPago";
import { useRecibosFormaPago } from "@/service/Recibos/useRecibosFormaPago";
import { IDatosSelect } from "../commons/select/Select";
import { useRecibosTarjetaCredito } from "@/service/Recibos/useRecibosTarjetaCredito";

interface PropsReciboTabTipoPago {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  watch: UseFormWatch<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
}

const ReciboTabTipoPago: React.FC<PropsReciboTabTipoPago> = ({
  datosDocumentos,
  watch,
  control,
}) => {
  const { data: dataFormasPagos } = useRecibosFormaPago();
  const { data: dataTarjetaCredito } = useRecibosTarjetaCredito();

  const formasPago = useMemo(() => {
    const datos: IDatosSelect[] = [];
    dataFormasPagos?.map((item) => {
      datos.push({
        label: item.nombre ?? "",
        value: item.codFormaPago ?? "",
      });
    });
    return datos;
  }, [dataFormasPagos]);

  const tarjetasCredito = useMemo(() => {
    const datos: IDatosSelect[] = [];
    dataTarjetaCredito?.map((item) => {
      datos.push({
        label: item.nomTarjeta ?? "",
        value: item.codTarjeta ?? "",
      });
    });
    return datos;
  }, [dataTarjetaCredito]);

  const renderItem = useCallback(
    ({ item, index }: { item: Partial<IReciboEnviar>; index: number }) => (
      <CardReciboTabTipoPago
        index={index}
        item={item}
        watch={watch}
        control={control}
        formasPago={formasPago}
        tarjetasCredito={tarjetasCredito}
        dataTarjetaCredito={dataTarjetaCredito}
      />
    ),
    [control, dataTarjetaCredito, formasPago, tarjetasCredito, watch]
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <FlatList
        data={datosDocumentos}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.doctran}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default ReciboTabTipoPago;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
  },
});
