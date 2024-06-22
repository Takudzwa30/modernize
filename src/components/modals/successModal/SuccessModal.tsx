// Libraries
import React from "react";
import Lottie from "react-lottie";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Animation
import success from "@/assets/jsonAnimations/success.json";

// Styles
import Style from "./SuccessModal.module.css";

interface SuccessModalProps {
  title?: string;
  subTitle?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title = "Success",
  subTitle = "You have successfully completed the task",
}) => {
  const { closeModal } = useModal();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={Style.successModal}>
      <Lottie options={defaultOptions} height={70} width={70} />
      <div className={Style.title}>{title}</div>
      <div className={Style.subTitle}>{subTitle}</div>
      <div onClick={closeModal} className={Style.continue}>
        Continue
      </div>
    </div>
  );
};

export default SuccessModal;
