import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import Card from "@/components/commons/card/Card";
import CarouselImagenes from "@/components/commons/carousel/CarouselImagenes";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { GRIS } from "@/constants/Colors";
import { formatCurrency } from "@/helper/function/numericas";

interface PropsCardReciboTabRecibo {
  item: Partial<IReciboEnviar>;
  index: number;
  watch: UseFormWatch<IReciboEnviarDatos>;
  handleOpenModalCamara: (index: number) => void;
  control: Control<IReciboEnviarDatos, any, IReciboEnviarDatos>;
}

const CardReciboTabRecibo: React.FC<PropsCardReciboTabRecibo> = ({
  index,
  item,
  watch,
  handleOpenModalCamara,
  control,
}) => {
  const { fields, remove } = useFieldArray({
    control,
    name: `datos.${index}.imagenes`,
  });

  // const imagenes = watch(`datos.${index}.imagenes`);
  const valorMora = watch(`datos.${index}.valorMora`);
  const valorCobranza = watch(`datos.${index}.valorCobranza`);
  const valorCancela = watch(`datos.${index}.valorCancela`);
  const observaciones = watch(`datos.${index}.observaciones`);

  const valorTotal = useMemo(() => {
    const valor =
      Number(valorMora) + Number(valorCancela) + Number(valorCobranza);
    return valor;
  }, [valorCancela, valorCobranza, valorMora]);

  const openModalCamara = useCallback(() => {
    handleOpenModalCamara(index);
  }, [handleOpenModalCamara, index]);

  const handleRemoveImage = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <Card style={styles.styleCard}>
      <HeaderCard labelLeft={item.doctran} labelRight={item.fechaComprobante} />
      <Separador />
      <View style={styles.containerImagen}>
        {fields && fields.length > 0 ? (
          <CarouselImagenes
            data={fields}
            width={convertirTamanoHorizontal(325)}
            camera
            handleOpenCamara={openModalCamara}
            paginacion
            remove
            handleRemoveImage={handleRemoveImage}
          />
        ) : (
          <Pressable onPress={openModalCamara} style={styles.stylePressable}>
            <Icon name="camera" size={convertirTamanoHorizontal(80)} />
          </Pressable>
        )}
      </View>
      <Separador />
      <HeaderCard
        labelLeft="# SECUENCIA"
        labelRight="REC-536-1"
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="VALOR A PAGAR"
        labelRight={formatCurrency(Number(valorCancela))}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="INTERES MORA"
        labelRight={formatCurrency(Number(valorMora))}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
      <HeaderCard
        labelLeft="GASTOS COBRANZA"
        labelRight={formatCurrency(Number(valorCobranza))}
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
        labelRight={observaciones}
        styleLeft={styles.styleLeftCard}
        styleRight={styles.styleRightCard}
      />
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
  },
  containerImagen: {
    height: convertirTamanoVertical(250),
  },
});
