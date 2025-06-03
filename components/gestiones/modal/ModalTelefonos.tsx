import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Card from "@/components/commons/card/Card";
import TextInput from "@/components/commons/card/TextInput";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { find } from "lodash";
import { ITelefono } from "@/models/ITelefono";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Icon from "react-native-vector-icons/EvilIcons";
import { GRIS_CLARO, NEGRO } from "@/constants/Colors";

const schema = z.object({
  identificacionCliente: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  telefono: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .min(1, "El telefono es requerido"),
  tipo: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .min(1, "El tipo es requerido"),
});

interface PropsModalTelefonos {
  visible: boolean;
  onClose: () => void;
  cedula: string;
}
const ModalTelefonos: React.FC<PropsModalTelefonos> = ({
  onClose,
  visible,
  cedula,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ITelefono>({
    resolver: zodResolver(schema),
    defaultValues: {
      identificacionCliente: cedula,
    },
  });

  const datos = useMemo(
    () => [
      { label: "CELULAR", value: "CELULAR" },
      { label: "CONVENCIONAL", value: "CONVENCIONAL" },
    ],
    []
  );

  const handleEliminarTelefono = useCallback(() => {
    console.log("eliminar");
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ITelefono }) => (
      <Card style={styles.cardTelefonos}>
        <View style={styles.closeButton}>
          <Pressable onPress={handleEliminarTelefono}>
            <Icon name="close" size={convertirTamanoHorizontal(30)} />
          </Pressable>
        </View>
        <HeaderCard labelLeft="Telefono:" labelRight={item.telefono} />
        <HeaderCard labelLeft="Tipo: " labelRight={item.tipo} />
      </Card>
    ),
    [handleEliminarTelefono]
  );

  const onSucess = useCallback((data: ITelefono) => {
    console.log(data);
  }, []);

  const onError = useCallback((error: any) => {
    console.log(error);
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Telefono">
      <Card style={styles.cardTelefonos}>
        <Controller
          control={control}
          name="telefono"
          render={({ field: { value, onChange } }) => (
            <TextInput
              defaultValueText={value}
              onChangeText={onChange}
              tipo="text"
              text="Telefono"
              direction="column"
              placeholder="Telefono"
              isError={!!errors.telefono}
              labelError={errors.telefono?.message}
              styleHeader={styles.styleTextHeader}
            />
          )}
        />
        <Controller
          control={control}
          name="tipo"
          render={({ field: { value, onChange } }) => (
            <TextInput
              tipo="select"
              text="Tipo"
              direction="column"
              placeholder="Seleccione un tipo"
              datos={datos}
              defaultValue={find(datos, (item) => item.value === value)?.value}
              onChangeSelect={(e) => onChange(e.value)}
              isError={!!errors.tipo}
              labelError={errors.tipo?.message}
              styleSelect={styles.styleSelect}
              styleHeader={styles.styleTextHeader}
            />
          )}
        />
        <ButtonCustom
          label="Guardar"
          style={styles.styleButton}
          onPress={handleSubmit(onSucess, onError)}
        />
      </Card>

      <View style={styles.containerTelefonos}>
        <ScrollView horizontal>
          <FlatList
            data={[
              {
                identificacionCliente: "",
                telefono: "0968718441",
                tipo: "CELULAR",
              },
            ]}
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
    </ModalCustom>
  );
};

export default ModalTelefonos;

const styles = StyleSheet.create({
  styleTextHeader: {
    width: "100%",
    fontSize: convertirTamanoHorizontal(14),
    marginVertical: convertirTamanoVertical(5),
  },
  styleSelect: {
    width: "100%",
    height: convertirTamanoVertical(55),
  },
  styleButton: {
    marginTop: convertirTamanoVertical(10),
    alignSelf: "center",
  },
  containerTelefonos: {
    height: convertirTamanoVertical(300),
    marginTop: convertirTamanoVertical(20),
  },
  cardTelefonos: {
    width: convertirTamanoHorizontal(320),
    alignSelf: "center",
    borderColor: GRIS_CLARO,
    borderWidth: 1,
    elevation: 1,
  },
  closeButton: {
    marginBottom: convertirTamanoVertical(10),
    alignItems: "flex-end",
  },
});
