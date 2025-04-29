import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";

import { Control, FieldArrayWithId, UseFormWatch } from "react-hook-form";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import CardReciboTabTipoPago from "./render/CardReciboTabTipoPago";

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
  const renderItem = useCallback(
    ({ item, index }: { item: Partial<IReciboEnviar>; index: number }) => (
      <CardReciboTabTipoPago
        index={index}
        item={item}
        watch={watch}
        control={control}
      />
    ),
    [control, watch]
  );

  return (
    <View>
      <FlatList
        data={datosDocumentos}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReciboTabTipoPago;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
  },
});
