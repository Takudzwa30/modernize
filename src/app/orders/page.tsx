import { Metadata } from "next";

// Components
import OrdersView from "./OrdersView";

export const metadata: Metadata = {
  title: "Orders",
};

const Billing: React.FC = () => {
  return (
    // <LoaderWrapper>
      <OrdersView />
    // </LoaderWrapper>
  );
};

export default Billing;
