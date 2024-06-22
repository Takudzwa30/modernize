"use client";

// Libraries
import useSWR, { mutate } from "swr";

// Components
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { AddOrder } from "@/components/modals";

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

const BACKEND_URL = "https://modernize-eb7ad-default-rtdb.firebaseio.com";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const OrdersView: React.FC = () => {
  const { data, error } = useSWR<Order[]>(
    BACKEND_URL + "/orders.json",
    fetcher
  );
  const { openModal } = useModal();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const orders = Object.values(data);

  const handleOpenModal = () => {
    openModal(<AddOrder />);
  };

  return (
    <>
      <div className={Style.header}>
        <h4>Orders</h4>
        <div className={Style.btns}>
          {/* <div
            onClick={() => {
              storeExpense();
            }}
            className={Style.export}
          >
            Export
          </div> */}
          <div onClick={handleOpenModal} className={Style.add}>
            <IoMdAdd size={20} />
            Add Order
          </div>
        </div>
      </div>
      <section className={Style.table}>
        <OrdersTable orders={orders} />
      </section>
    </>
  );
};

export default OrdersView;
