// Libraries
import { mutate } from "swr";

// Utils
import { deleteFromTable } from "@/utils/useTableData";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Components
import SuccessModal from "../successModal/SuccessModal";

// Styles
import Style from "./DeleteModal.module.css";

type ModalTypes = {
  ids: string[];
  tableName: string;
};

const DeleteModal: React.FC<ModalTypes> = ({ ids, tableName }) => {
  const { openModal, closeModal } = useModal();
  const handleDelete = async () => {
    for (const id of ids) {
      try {
        const { success, error } = await deleteFromTable(tableName, id);

        if (success) {
          openModal(<SuccessModal />);
          mutate(`${process.env.NEXT_PUBLIC_DATABASE_URL}/${tableName}.json`);
        } else {
          console.error(`Failed to delete order with ID: ${id}`, error);
        }
      } catch (error) {
        console.error(
          `Unexpected error occurred while deleting order with ID: ${id}`,
          error
        );
      }
    }
  };

  return (
    <div className={Style.delete_modal}>
      <h4>Delete {tableName}</h4>
      <p>
        Are you sure you want to delete {ids.length} {tableName}?
      </p>
      <div className={Style.actions}>
        <button onClick={closeModal} className={Style.cancelButton}>
          Cancel
        </button>
        <button onClick={handleDelete} className={Style.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
