"use client";

import React from "react";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Icons
import { MdOutlineClose } from "react-icons/md";

// Styles
import Style from "./Modal.module.css";

const Modal: React.FC = () => {
  const { isModalOpen, modalContent, closeModal } = useModal();

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isModalOpen && modalContent && (
        <dialog onClick={handleBackdropClick} className={Style.modalBackdrop}>
          <div className={Style.modalContent}>
            <div onClick={closeModal} className={Style.closeIcon}>
              <MdOutlineClose />
            </div>
            {modalContent}
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
