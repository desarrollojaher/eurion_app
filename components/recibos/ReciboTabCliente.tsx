import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import { FlatList } from "react-native";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Separador from "../commons/separador/Separador";
import TextInput from "../commons/card/TextInput";
import { GRIS } from "@/constants/Colors";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";

interface PropsRecibiTabCliente {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
}

const ReciboTabCliente: React.FC<PropsRecibiTabCliente> = ({
  datosDocumentos,
  control,
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: Partial<IReciboEnviar>; index: number }) => (
      <Card style={styles.styleCard}>
        <HeaderCard
          labelLeft={item.doctran}
          labelRight={item.fechaComprobante}
          styleRight={styles.labelRightCard}
        />
        <Separador />
        <Controller
          name={`datos.${index}.valorMora`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="VALOR POR MORA"
              tipo="text"
              placeholder="Valor"
              keyboardType="numeric"
              onChangeText={onChange}
              defaultValueText={value.toString()}
            />
          )}
        />
        <Controller
          name={`datos.${index}.valorCobranza`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="VALOR DE COBRANZA"
              tipo="text"
              placeholder="Valor"
              keyboardType="numeric"
              defaultValueText={value.toString()}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name={`datos.${index}.valorCancela`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="VALOR CANCELA"
              tipo="text"
              placeholder="Valor"
              keyboardType="numeric"
              defaultValueText={value.toString()}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          name={`datos.${index}.observaciones`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text=""
              tipo="text"
              placeholder="Observaciones"
              direction="column"
              multiline
              defaultValueText={value}
              onChangeText={onChange}
            />
          )}
        />
      </Card>
    ),
    [control]
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

export default ReciboTabCliente;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
  },
  styleCard: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(345),
    alignSelf: "center",
  },
  labelRightCard: {
    color: GRIS,
  },
});
