import React, { useMemo } from "react";
import ModalCustom from "./ModalCustom";
import LottieAnimation from "../lottie/LottieAnimation";

interface PropsModalLoading {
  onClose: () => void;
  visible: boolean;
}
const ModalLoading: React.FC<PropsModalLoading> = ({ onClose, visible }) => {
  const animation = useMemo(() => {
    return require("../../../assets/animations/loadingData.json");
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Guardando">
      <LottieAnimation resource={animation} />
    </ModalCustom>
  );
};

export default ModalLoading;
