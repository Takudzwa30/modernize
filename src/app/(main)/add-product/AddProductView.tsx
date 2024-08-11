"use client";

// Components
import Button from "@/components/ui/button/Button";
import BreadCrumb from "@/components/ui/breadCrumb/BreadCrumb";
import AddCategory from "@/components/modals/addCategory/AddCategory";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Styles
import Style from "./AddProductView.module.css";

export default function AddProductView() {
  const { openModal } = useModal();

  // Functions
  const handleOpenModal = () => {
    openModal(<AddCategory />);
  };
  return (
    <>
      <BreadCrumb buttonTitle="Back" />
      <div className={Style.header}>
        <h4>Add Product</h4>
        <div className={Style.btns}>
          <Button text="Cancel" onClick={handleOpenModal} variant />
          <Button text="Save" />
        </div>
      </div>
    </>
  );
}
