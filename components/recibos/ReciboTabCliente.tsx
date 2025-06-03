import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import { Control, FieldArrayWithId, UseFormSetValue } from "react-hook-form";
import { IDocumentosCabecera } from "@/models/IDocumentos";
import CardReciboTabCliente from "./render/CardReciboTabCliente";

interface PropsRecibiTabCliente {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  datos: IDocumentosCabecera[];
  setValue: UseFormSetValue<IReciboEnviarDatos>;
}

const ReciboTabCliente: React.FC<PropsRecibiTabCliente> = ({
  datosDocumentos,
  control,
  datos,
  setValue,
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: IReciboEnviar; index: number }) => (
      <CardReciboTabCliente
        index={index}
        item={item}
        datos={datos}
        control={control}
        setValue={setValue}
      />
    ),
    [control, datos]
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

export default ReciboTabCliente;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
  },
});
