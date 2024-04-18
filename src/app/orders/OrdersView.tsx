// Components
import OrdersTable from "./components/OrdersTable/OrdersTable";

// Icons
import { IoMdAdd } from "react-icons/io";

// Styles
import Style from "./OrdersView.module.css";

const OrdersView: React.FC = () => {
  return (
    <>
      <div className={Style.header}>
        <h4>Orders</h4>
        <div className={Style.btns}>
          <div className={Style.export}>Export</div>
          <div className={Style.add}>
            <IoMdAdd size={20} />
            Add Order
          </div>
        </div>
      </div>
      <section className={Style.table}>
        <OrdersTable />
      </section>
    </>
  );
};

export default OrdersView;
