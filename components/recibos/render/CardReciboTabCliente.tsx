import { Pressable, StyleSheet, Text } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import { formatCurrency } from "@/helper/function/numericas";
import { find } from "lodash";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import TextInput from "@/components/commons/card/TextInput";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import { IComprobanteObtener } from "@/models/IComprobante";
import Icon from "react-native-vector-icons/FontAwesome5";
import { View } from "react-native";

interface PropsCardReciboTabCliente {
  item: IReciboEnviar;
  index: number;
  datos: IComprobanteObtener[];
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  setValue: UseFormSetValue<IReciboEnviarDatos>;
}
const CardReciboTabCliente: React.FC<PropsCardReciboTabCliente> = ({
  index,
  item,
  datos,
  control,
  setValue,
}) => {
  const [errorMora, setErrorMora] = useState<boolean>(false);
  const [errorCobranza, setErrorCobranza] = useState<boolean>(false);
  const [errorCancelar, setErrorCancelar] = useState<boolean>(false);
  const [mostrarComentario, setMostrarComentario] = useState<boolean>(false);

  const valor = useMemo(
    () =>
      find(
        datos,
        (valor) =>
          item?.doctran === `${valor.tipoComprobante} ${valor.idCredito}`,
      ),
    [datos, item?.doctran],
  );

  const handleChangeMora = useCallback(
    (cantidad: string) => {
      setValue(`datos.${index}.valorMora`, cantidad);
      if (
        (valor && valor?.interesGastoMora) ??
        0 < Number(cantidad !== "" ? cantidad.replace(",", ".") : 0)
      ) {
        setErrorMora(true);
      } else {
        setErrorMora(false);
      }
    },
    [index, setValue, valor],
  );

  const handleChangeCobranza = useCallback(
    (cantidad: string) => {
      setValue(`datos.${index}.valorCobranza`, cantidad);
      if (
        (valor && valor?.interesGastoCobranza) ??
        0 < Number(cantidad !== "" ? cantidad.replace(",", ".") : 0)
      ) {
        setErrorCobranza(true);
      } else {
        setErrorCobranza(false);
      }
    },
    [index, setValue, valor],
  );

  const handleChangeCancelar = useCallback(
    (cantidad: string) => {
      setValue(`datos.${index}.valorCancela`, cantidad);

      if (
        valor &&
        (valor?.crSaldoCredito ?? 0) +
        (valor?.interesGastoCobranza ?? 0) +
        (valor?.interesGastoMora ?? 0) >=
        Number(cantidad !== "" ? cantidad.replace(",", ".") : 0)
      ) {
        setErrorCancelar(false);
      } else {
        setErrorCancelar(true);
      }
    },
    [index, setValue, valor],
  );

  return (
    <Card style={styles.styleCard}>
      <HeaderCard
        labelLeft={item.doctran}
        labelRight={item.fechaComprobante}
        styleRight={styles.labelRightCard}
      />
      <Separador />
      <HeaderCard
        labelLeft="Deuda Total"
        labelRight={formatCurrency(valor?.valorTotalCredito ?? 0)}
      />
      <HeaderCard
        labelLeft="Saldo interes"
        labelRight={formatCurrency(valor?.crSaldoInteres ?? 0)}
      />
      <HeaderCard
        labelLeft="Saldo vencido"
        labelRight={formatCurrency(valor?.saldoVencido ?? 0)}
      />
      <HeaderCard
        labelLeft="Interes por mora"
        labelRight={formatCurrency(valor?.interesGastoMora ?? 0)}
      />
      <HeaderCard
        labelLeft="Gastos cobranza"
        labelRight={formatCurrency(valor?.interesGastoCobranza ?? 0)}
      />
      {/* <Controller
        name={`datos.${index}.valorMora`}
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            text="VALOR POR MORA"
            tipo="text"
            placeholder="Valor"
            inputMode="decimal"
            onChangeText={(e) => handleChangeMora(e)}
            defaultValueText={value?.toString()}
            isError={errorMora}
            labelError={"El valor sobrepasa al valor por mora"}
          />
        )}
      />
      <Controller
        name={`datos.${index}.valorCobranza`}
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            text="VALOR DE COBRANZA"
            tipo="text"
            placeholder="Valor"
            inputMode="decimal"
            defaultValueText={value?.toString()}
            onChangeText={(e) => handleChangeCobranza(e)}
            isError={errorCobranza}
            labelError={"El valor sobrepasa al valor por cobranza"}
          />
        )}
      /> */}
      <Controller
        name={`datos.${index}.valorCancela`}
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            text="VALOR CANCELA"
            tipo="text"
            placeholder="Valor"
            inputMode="decimal"
            defaultValueText={value?.toString()}
            onChangeText={(e) => handleChangeCancelar(e)}
            isError={errorCancelar}
            labelError={"El valor sobrepasa al saldo vencido"}
          />
        )}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Observaciones</Text>
        <Pressable onPress={() => setMostrarComentario(!mostrarComentario)}>
          <Icon name="plus" size={20} color={GRIS} />
        </Pressable>
      </View>
      {mostrarComentario && (
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
      )}
    </Card>
  );
};

export default CardReciboTabCliente;

const styles = StyleSheet.create({
  styleCard: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(345),
    marginBottom: convertirTamanoVertical(10),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: GRIS_CLARO,
  },
  labelRightCard: {
    color: GRIS,
  },
});
