import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import Card from "@/components/commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import IconFont from "react-native-vector-icons/FontAwesome";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  UseFormWatch,
} from "react-hook-form";
import { BLANCO, GRIS, GRIS_CLARO } from "@/constants/Colors";
import { formatCurrency } from "@/helper/function/numericas";
import { IFormaPago } from "@/models/IFormaPago";
import { find, findIndex } from "lodash";
import LottieAnimation from "@/components/commons/lottie/LottieAnimation";

interface PropsCardReciboTabRecibo {
  item: Partial<IReciboEnviar>;
  index: number;
  watch: UseFormWatch<IReciboEnviarDatos>;
  handleOpenModalCamara: (index: number) => void;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
  dataFormasPagos: IFormaPago[] | undefined;
  datosDocumentos: FieldArrayWithId<IReciboEnviarDatos, "datos", "id">[];
}

const CardReciboTabRecibo: React.FC<PropsCardReciboTabRecibo> = ({
  item,
  watch,
  handleOpenModalCamara,
  control,
  dataFormasPagos,
  datosDocumentos,
}) => {
  const index = useMemo(() => {
    const index = findIndex(
      datosDocumentos,
      (items) => items.doctran === item.doctran,
    );
    return index;
  }, [datosDocumentos, item.doctran]);

  const { remove: removeValores, fields: comprobantes } = useFieldArray({
    control,
    name: `datos.${index}.valores`,
  });
  // const imagenes = watch(`datos.${index}.imagenes`);
  const valorMora = watch(`datos.${index}.valorMora`);
  const valorCobranza = watch(`datos.${index}.valorCobranza`);
  const valorCancela = watch(`datos.${index}.valorCancela`);
  const observaciones = watch(`datos.${index}.observaciones`);

  const animation = useMemo(() => {
    return require("../../../assets/animations/empty.json");
  }, []);

  const valorTotal = useMemo(() => {
    const valor =
      Number(valorMora ? valorMora.replace(",", ".") : 0) +
      Number(valorCancela ? valorCancela.replace(",", ".") : 0) +
      Number(valorCobranza ? valorCobranza.replace(",", ".") : 0);
    return valor;
  }, [valorCancela, valorCobranza, valorMora]);

  const handleRemoveValores = useCallback(
    (index: number) => {
      removeValores(index);
    },
    [removeValores],
  );

  if (!valorMora && !valorCobranza && !valorCancela && index === 0)
    return (
      <View style={styles.styleSinInfo}>
        <LottieAnimation resource={animation} />
        <Text style={styles.styleText}>No a ingresado ningun valor</Text>
      </View>
    );

  if (!valorMora && !valorCobranza && !valorCancela && index !== 0) return;

  return (
    <Card style={styles.styleCard}>
      <HeaderCard labelLeft={item.doctran} labelRight={item.fechaComprobante} />
      <Separador />
      <HeaderCard
        labelLeft="VALOR A PAGAR CANCELADO"
        labelRight={formatCurrency(
          Number(valorCancela?.replace(",", ".") ?? 0),
        )}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="INTERES MORA"
        labelRight={formatCurrency(Number(valorMora?.replace(",", ".") ?? 0))}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="GASTOS COBRANZA"
        labelRight={formatCurrency(
          Number(valorCobranza?.replace(",", ".") ?? 0),
        )}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="TOTAL"
        labelRight={formatCurrency(Number(valorTotal))}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="OBSERVACIONES"
        labelRight={
          observaciones && observaciones?.length > 0
            ? observaciones
            : "Sin Observacion"
        }
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      {comprobantes &&
        comprobantes.map((item, index) => (
          <Card key={index} style={styles.styleCardTiposPago}>
            <View style={styles.styleContainerTiposPago}>
              <View
                style={{
                  width: convertirTamanoHorizontal(250),
                }}
              >
                <HeaderCard
                  labelLeft="Tipo de Pago"
                  labelRight={
                    find(
                      dataFormasPagos,
                      (valor) => valor.fpId?.toString() === item.tipoPago,
                    )?.fpNombre ?? ""
                  }
                  styleLeft={styles.styleLeftTiposPagoCard}
                  styleRight={styles.styleRightTiposPagoCard}
                />
                <HeaderCard
                  labelLeft="Valor Total"
                  labelRight={formatCurrency(item.valor)}
                  styleLeft={styles.styleLeftTiposPagoCard}
                  styleRight={styles.styleRightTiposPagoCard}
                />
              </View>
              <Pressable
                onPress={() => handleRemoveValores(index)}
                style={styles.stylePressable}
              >
                <IconFont name="close" size={convertirTamanoHorizontal(25)} />
              </Pressable>
            </View>
          </Card>
        ))}
    </Card>
  );
};

export default CardReciboTabRecibo;

const styles = StyleSheet.create({
  styleLeftCard: {
    width: convertirTamanoHorizontal(150),
    fontSize: convertirTamanoHorizontal(13),
  },
  styleRightCard: {
    width: convertirTamanoHorizontal(180),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
  stylePressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  styleCard: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(345),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: GRIS_CLARO,
    marginBottom: convertirTamanoVertical(10),
  },
  containerImagen: {
    height: convertirTamanoVertical(250),
  },
  styleContainerTiposPago: {
    width: convertirTamanoHorizontal(280),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleCardTiposPago: {
    gap: convertirTamanoVertical(10),
    width: convertirTamanoHorizontal(300),
    alignSelf: "center",
  },
  styleRightTiposPagoCard: {
    width: convertirTamanoHorizontal(120),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
  styleLeftTiposPagoCard: {
    width: convertirTamanoHorizontal(130),
    fontSize: convertirTamanoHorizontal(13),
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
