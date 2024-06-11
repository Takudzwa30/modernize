import { Metadata } from "next";

// Components
import OrdersView from "./OrdersView";
import Loader from "@/components/advanced/loader/Loader";

export const metadata: Metadata = {
  title: "Orders",
};

const Billing: React.FC = () => {
  return (
    <Loader>
      <OrdersView />
    </Loader>
  );
};

export default Billing;
