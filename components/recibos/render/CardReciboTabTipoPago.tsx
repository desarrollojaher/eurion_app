import { StyleSheet } from "react-native";
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
import { ITarjetaCredito } from "@/models/ITarjetaCredito";

const schemaTiposPago = z.object({
  banco: z.string().nullish(),
  tipoPago: z.string().min(1, "El tipo de pago es requerido"),
  numeroDocumento: z.string().nullish(),
  fechaVencimiento: z.string().nullish(),
  emisor: z.string().nullish(),
  numeroCuenta: z.string().nullish(),
  propieario: z.string().nullish(),
  numeroCheque: z.string().nullish(),
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
  tarjetasCredito: IDatosSelect[];
  dataTarjetaCredito: ITarjetaCredito[] | undefined;
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
}

const CardReciboTabTipoPago: React.FC<PropsCardReciboTabTipoPago> = ({
  item,
  watch,
  control,
  formasPago,
  tarjetasCredito,
  dataTarjetaCredito,
  datosDocumentos,
}) => {
  const index = useMemo(() => {
    const index = findIndex(
      datosDocumentos,
      (items) => items.doctran === item.doctran
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

  const defaultValue = useMemo<IRecibosEnviarDetalles>(
    () => ({
      tipoPago: formasPago[0].value,
      valor: null,
      emisor: null,
      fechaVencimiento: null,
      numeroCHE: null,
      numeroCuenta: null,
      numeroDocumento: null,
      propieario: null,
      numeroCheque: null,
      banco: null,
    }),
    [formasPago]
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

  const handleChangeSelectTipo = useCallback((data: IDatosSelect) => {
    setTipoPago(data);
  }, []);

  const handleChangeEmisor = useCallback(
    (e: IDatosSelect) => {
      setValueTiposPagos(`emisor`, e.value);
      const banco = find(
        dataTarjetaCredito,
        (item) => e.value === item.codTarjeta
      );
      setValueTiposPagos(`banco`, banco?.codBanco);
    },
    [dataTarjetaCredito, setValueTiposPagos]
  );

  const onSuccess = useCallback(
    (data: IRecibosEnviarDetalles) => {
      console.log(data);

      if (data.tipoPago === "EFE") {
        if (!data.valor || (data.valor && data.valor <= 0)) {
          setErrorTiposPagos("valor", {
            message: "Debe ingresar un valor válido",
          });
          return;
        }
      }
      if (data.tipoPago === "CHE") {
        let errores = false;
        if (!data.valor || data.valor <= 0) {
          setErrorTiposPagos("valor", {
            message: "Debe ingresar un valor válido",
          });
          errores = true;
        }
        if (!data.fechaVencimiento || data.fechaVencimiento === "") {
          setErrorTiposPagos("fechaVencimiento", {
            message: "Debe ingresar una fecha",
          });
          errores = true;
        }
        if (!data.emisor || data.emisor === "") {
          setErrorTiposPagos("emisor", {
            message: "Debe seleccionar un emisor",
          });
          errores = true;
        }
        if (!data.numeroCuenta || data.numeroCuenta === "") {
          setErrorTiposPagos("numeroCuenta", {
            message: "Debe ingresar un numero de cuenta",
          });
          errores = true;
        }
        if (!data.propieario || data.propieario === "") {
          setErrorTiposPagos("propieario", {
            message: "Debe ingresar un numero de propietario",
          });
          errores = true;
        }
        if (!data.numeroCheque || data.numeroCheque === "") {
          setErrorTiposPagos("numeroCheque", {
            message: "Debe ingresar un numero de CHE",
          });
          errores = true;
        }
        if (errores) return;
      }
      if (data.tipoPago === "TCR") {
        let errores = false;
        if (!data.valor || data.valor <= 0) {
          setErrorTiposPagos("valor", {
            message: "Debe ingresar un valor válido",
          });
          errores = true;
        }
        if (!data.fechaVencimiento || data.fechaVencimiento === "") {
          setErrorTiposPagos("fechaVencimiento", {
            message: "Debe ingresar una fecha",
          });
          errores = true;
        }
        if (!data.emisor || data.emisor === "") {
          setErrorTiposPagos("emisor", {
            message: "Debe seleccionar un emisor",
          });
          errores = true;
        }
        if (!data.numeroDocumento || data.numeroDocumento === "") {
          setErrorTiposPagos("numeroDocumento", {
            message: "Debe ingresar un numero de documento",
          });
          errores = true;
        }
        if (!data.numeroCuenta || data.numeroCuenta === "") {
          setErrorTiposPagos("numeroCuenta", {
            message: "Debe ingresar un numero de cuenta",
          });
          errores = true;
        }
        if (errores) return;
      }

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
          "Debe ingresar un valor a pagar en clientes para este comprobante"
        );
      }
    },
    [append, resetTiposPagos, setErrorTiposPagos, valorIngresado, valorTotal]
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
            defaultValue={value}
            isError={!!errorsTipoDatos.tipoPago}
            labelError={errorsTipoDatos.tipoPago?.message}
          />
        )}
      />
      <Separador />
      {tipoPago?.value === "TCR" && (
        <Controller
          name="numeroDocumento"
          control={controlTiposPagos}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="# DOCUMENTO"
              tipo="text"
              placeholder="# documento"
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
              styleTextInput={styles.styleInput}
              isError={!!errorsTipoDatos.numeroDocumento}
              labelError={errorsTipoDatos.numeroDocumento?.message}
            />
          )}
        />
      )}
      {(tipoPago?.value === "TCR" || tipoPago?.value === "CHE") && (
        <Controller
          name="emisor"
          control={controlTiposPagos}
          render={({ field: { value } }) => (
            <TextInput
              text="EMISOR"
              tipo="select"
              datos={tarjetasCredito}
              placeholder="Emisor"
              defaultValue={value ?? undefined}
              onChangeSelect={(e) => handleChangeEmisor(e)}
              isError={!!errorsTipoDatos.emisor}
              labelError={errorsTipoDatos.emisor?.message}
            />
          )}
        />
      )}
      {(tipoPago?.value === "TCR" || tipoPago?.value === "CHE") && (
        <Controller
          name="fechaVencimiento"
          control={controlTiposPagos}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="FECHA VENCIMIENTO"
              tipo="date"
              placeholder="Fecha vencimiento"
              styleTextInput={styles.styleInput}
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
              isError={!!errorsTipoDatos.fechaVencimiento}
              labelError={errorsTipoDatos.fechaVencimiento?.message}
            />
          )}
        />
      )}

      {(tipoPago?.value === "TCR" || tipoPago?.value === "CHE") && (
        <Controller
          name="numeroCuenta"
          control={controlTiposPagos}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="# CUENTA"
              tipo="text"
              placeholder="Numero cuenta"
              styleTextInput={styles.styleInput}
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
              isError={!!errorsTipoDatos.numeroCuenta}
              labelError={errorsTipoDatos.numeroCuenta?.message}
            />
          )}
        />
      )}
      {tipoPago?.value === "CHE" && (
        <Controller
          name="propieario"
          control={controlTiposPagos}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="# PROPIETARIO"
              tipo="text"
              placeholder="propietario"
              styleTextInput={styles.styleInput}
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
              isError={!!errorsTipoDatos.propieario}
              labelError={errorsTipoDatos.propieario?.message}
            />
          )}
        />
      )}
      {tipoPago?.value === "CHE" && (
        <Controller
          name="numeroCheque"
          control={controlTiposPagos}
          render={({ field: { value, onChange } }) => (
            <TextInput
              text="# CHEQUE"
              tipo="text"
              placeholder="numero cheque"
              styleTextInput={styles.styleInput}
              defaultValueText={value ?? undefined}
              onChangeText={onChange}
              isError={!!errorsTipoDatos.numeroCheque}
              labelError={errorsTipoDatos.numeroCheque?.message}
            />
          )}
        />
      )}
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
