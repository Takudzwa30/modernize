"use client";

// Utils
import { useTableData } from "@/utils/useTableData";

// Components
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { AddOrder } from "@/components/modals";
import Button from "@/components/ui/button/Button";

// Contexts
import { useModal } from "@/contexts/ModalContext";

// Icons
import { IoMdAdd } from "react-icons/io";

// Styles
import Style from "./OrdersView.module.css";

// Types
interface Order {
  orderNumber: string;
  date: Date;
  customer: string;
  paymentStatus: string;
  orderStatus: string;
  amount: number;
}

const OrdersView: React.FC = () => {
  const { openModal } = useModal();

  const { data: orders, error } = useTableData<Order>("orders");

  return (
    <>
      <div className={Style.header}>
        <h4>Orders</h4>
        <div className={Style.btns}>
          {/* <Button variant text="Export" onClick={() => storeExpense()} /> */}
          <Button
            text="Add Order"
            icon={<IoMdAdd size={20} />}
            onClick={() => openModal(<AddOrder />)}
          />
        </div>
      </div>
      <section className={Style.table}>
        <OrdersTable orders={orders} />
      </section>
    </>
  );
};

export default OrdersView;
