import { Metadata } from "next";

// Components
import ProductsView from "./ProductsView";
import Loader from "@/components/advanced/loader/Loader";

export const metadata: Metadata = {
  title: "Products",
};

const Products: React.FC = () => {
  return (
    <Loader>
      <ProductsView />
    </Loader>
  );
};

export default Products;
