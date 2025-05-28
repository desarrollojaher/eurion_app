import { ScrollView, StyleSheet } from "react-native";
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
import { formatCurrency } from "@/helper/function/numericas";
import { find } from "lodash";
import { IDocumentosCabecera } from "@/models/IDocumentos";

interface PropsRecibiTabCliente {
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  datos: IDocumentosCabecera[];
}

const ReciboTabCliente: React.FC<PropsRecibiTabCliente> = ({
  datosDocumentos,
  control,
  datos,
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: IReciboEnviar; index: number }) => (
      <Card style={styles.styleCard}>
        <HeaderCard
          labelLeft={item.doctran}
          labelRight={item.fechaComprobante}
          styleRight={styles.labelRightCard}
        />
        <Separador />
        <HeaderCard
          labelLeft="Deuda Total"
          labelRight={formatCurrency(
            find(datos, (valor) => item?.doctran === valor.nroDocumento)
              ?.deudaTotal ?? 0
          )}
        />
        <HeaderCard
          labelLeft="Saldo vencido"
          labelRight={formatCurrency(
            find(datos, (valor) => item?.doctran === valor.nroDocumento)
              ?.saldoVencido ?? 0
          )}
        />
        <HeaderCard
          labelLeft="Interes por mora"
          labelRight={formatCurrency(
            find(datos, (valor) => item?.doctran === valor.nroDocumento)
              ?.interesMora ?? 0
          )}
        />
        <HeaderCard
          labelLeft="Gastos cobranza"
          labelRight={formatCurrency(
            find(datos, (valor) => item?.doctran === valor.nroDocumento)
              ?.gastosCobranza ?? 0
          )}
        />
        <Controller
          name={`datos.${index}.valorMora`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="VALOR POR MORA"
              tipo="text"
              placeholder="Valor"
              inputMode="decimal"
              onChangeText={onChange}
              defaultValueText={value?.toString()}
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
              inputMode="decimal"
              defaultValueText={value?.toString()}
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
              inputMode="decimal"
              defaultValueText={value?.toString()}
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
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
            />
          )}
        />
      </Card>
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
  styleCard: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(345),
    alignSelf: "center",
  },
  labelRightCard: {
    color: GRIS,
  },
});
