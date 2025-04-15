import { StyleSheet, Text } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select from "@/components/commons/select/Select";

interface PropsModalDatos {
  visible: boolean;
  onClose: () => void;
}

const emojisWithIcons = [
  { label: "happy", value: "emoticon-happy-outline" },
  { label: "cool", value: "emoticon-cool-outline" },
  { label: "lol", value: "emoticon-lol-outline" },
  { label: "sad", value: "emoticon-sad-outline" },
  { label: "cry", value: "emoticon-cry-outline" },
  { label: "angry", value: "emoticon-angry-outline" },
  { label: "confused", value: "emoticon-confused-outline" },
  { label: "excited", value: "emoticon-excited-outline" },
  { label: "kiss", value: "emoticon-kiss-outline" },
  { label: "devil", value: "emoticon-devil-outline" },
  { label: "dead", value: "emoticon-dead-outline" },
  { label: "wink", value: "emoticon-wink-outline" },
  { label: "sick", value: "emoticon-sick-outline" },
  { label: "frown", value: "emoticon-frown-outline" },
];

const ModalDatos: React.FC<PropsModalDatos> = ({ onClose, visible }) => {
  return (
    <ModalCustom onClose={onClose} visible={visible}>
      <Select datos={emojisWithIcons} />
      <Text>dsfef</Text>
      <Text>dsfef</Text>
      <Text>dsfef</Text>
    </ModalCustom>
  );
};

export default ModalDatos;

const styles = StyleSheet.create({});
