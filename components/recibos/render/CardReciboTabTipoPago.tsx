import { StyleSheet, Text } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import TextInput from "@/components/commons/card/TextInput";
import { IDatosSelect } from "@/components/commons/select/Select";
import {
  IReciboEnviar,
  IReciboEnviarDatos,
  IRecibosEnviarDetalles,
} from "@/models/IRecibo";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useForm,
  UseFormWatch,
} from "react-hook-form";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "toastify-react-native";
import { formatCurrency } from "@/helper/function/numericas";
import { find, findIndex, sumBy } from "lodash";
import { IFormaPago } from "@/models/IFormaPago";

const schemaTiposPago = z.object({
  tipoPago: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .min(1, "El tipo de pago es requerido"),
  valor: z.preprocess((val): number | null | undefined => {
    if (val === undefined || val === null) {
      return val;
    }
    if (typeof val === "string" && val.trim() !== "") {
      const d = val.replace(",", ".");
      const parsedValue = Number(d);
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return typeof val === "number" ? val : null;
  }, z.number().min(1, "Ingrese un numero mayor a 0").nullish()),
});

interface PropsCardReciboTabTipoPago {
  item: Partial<IReciboEnviar>;
  watch: UseFormWatch<IReciboEnviarDatos>;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  formasPago: IDatosSelect[];
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
  dataFormasPago: IFormaPago[] | undefined;
}

const CardReciboTabTipoPago: React.FC<PropsCardReciboTabTipoPago> = ({
  item,
  watch,
  control,
  formasPago,
  datosDocumentos,
  dataFormasPago,
}) => {
  const defaultValue = useMemo<IRecibosEnviarDetalles>(
    () => ({
      tipoPago: "",
      valor: null,
    }),
    [],
  );

  const {
    control: controlTiposPagos,
    handleSubmit: handleSubmitTipoPagos,
    formState: { errors: errorsTipoDatos },
    setError: setErrorTiposPagos,
    reset: resetTiposPagos,
    setValue: setValueTiposPagos,
  } = useForm<IRecibosEnviarDetalles>({
    resolver: zodResolver(schemaTiposPago),
    defaultValues: defaultValue,
  });

  const [tipoPago, setTipoPago] = useState<IDatosSelect | undefined>();

  const pideFoto = useMemo(() => {
    const f = find(
      dataFormasPago,
      (item) => item.fpId === Number(tipoPago?.value),
    );
    if (f) {
      return f.fpSolicitaDetalle;
    } else {
      return false;
    }
  }, [dataFormasPago, tipoPago?.value]);

  const index = useMemo(() => {
    const index = findIndex(
      datosDocumentos,
      (items) => items.doctran === item.doctran,
    );
    return index;
  }, [datosDocumentos, item.doctran]);

  const { append, fields } = useFieldArray({
    control,
    name: `datos.${index}.valores`,
  });

  const valorIngresado = sumBy(fields, (item) => Number(item?.valor ?? "0"));

  const valorMora = watch(`datos.${index}.valorMora`);
  const valorCobranza = watch(`datos.${index}.valorCobranza`);
  const valorCancela = watch(`datos.${index}.valorCancela`);

  const valorTotal = useMemo(() => {
    const valor =
      Number(valorMora ? valorMora.replace(",", ".") : 0) +
      Number(valorCancela ? valorCancela.replace(",", ".") : 0) +
      Number(valorCobranza ? valorCobranza.replace(",", ".") : 0);
    return valor;
  }, [valorCancela, valorCobranza, valorMora]);

  const handleChangeSelectTipo = useCallback((data: IDatosSelect) => {
    setTipoPago(data);
  }, []);

  const onSuccess = useCallback(
    (data: IRecibosEnviarDetalles) => {
      console.log(data);

      if (valorTotal > 0) {
        if (data.valor === null || data.valor === "") {
          Toast.error("Ingrese un valor válido");
          return;
        }
        if (valorIngresado + Number(data.valor) > valorTotal) {
          Toast.error("El valor a pagar va a sobrepasar al valor total");
          return;
        }
        append(data);
        resetTiposPagos();
        setTipoPago({ label: "CONTADO", value: "CONTADO" });
        Toast.success("Tipo de pago agregado");
      } else {
        Toast.error(
          "Debe ingresar un valor a pagar en clientes para este comprobante",
        );
      }
    },
    [append, resetTiposPagos, valorIngresado, valorTotal],
  );

  const onError = useCallback((error: any) => {
    console.log("Errores ===> ", error);
  }, []);

  return (
    <Card style={styles.styleCard}>
      <HeaderCard labelLeft={item.doctran} labelRight={item.fechaComprobante} />
      <Separador />

      <HeaderCard
        labelLeft="Valor Total"
        labelRight={formatCurrency(valorTotal)}
      />
      <HeaderCard
        labelLeft="Valor Abondo"
        labelRight={formatCurrency(valorIngresado)}
      />
      <HeaderCard
        labelLeft="Valor faltante"
        labelRight={formatCurrency(valorTotal - valorIngresado)}
      />

      <Controller
        name="valor"
        control={controlTiposPagos}
        render={({ field: { value, onChange } }) => (
          <TextInput
            text="VALOR A PAGAR"
            tipo="text"
            placeholder="Valor a pagar"
            styleTextInput={styles.styleInput}
            onChangeText={onChange}
            defaultValueText={value?.toString() ?? ""}
            isError={!!errorsTipoDatos.valor}
            labelError={errorsTipoDatos.valor?.message}
            inputMode="decimal"
          />
        )}
      />

      <Controller
        name="tipoPago"
        control={controlTiposPagos}
        render={({ field: { value, onChange } }) => (
          <TextInput
            text="TIPO DE PAGO"
            tipo="select"
            datos={formasPago}
            placeholder="Tipo pago"
            onChangeSelect={(e) => {
              handleChangeSelectTipo(e);
              onChange(e.value);
            }}
            defaultValue={value ?? ""}
            isError={!!errorsTipoDatos.tipoPago}
            labelError={errorsTipoDatos.tipoPago?.message}
          />
        )}
      />
      {pideFoto && <Text>Tomar Imagen</Text>}
      <Separador />

      <ButtonCustom
        label="Agregar"
        style={styles.styleButton}
        onPress={handleSubmitTipoPagos(onSuccess, onError)}
      />
    </Card>
  );
};

export default CardReciboTabTipoPago;

const styles = StyleSheet.create({
  styleCard: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(345),
    alignSelf: "center",
    minHeight: convertirTamanoVertical(400),
  },
  styleInput: {
    height: convertirTamanoVertical(50),
    width: convertirTamanoHorizontal(185),
  },
  styleButton: {
    alignSelf: "center",
  },
});
