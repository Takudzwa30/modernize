"use client";

// Utils
import { useTableData } from "@/utils/useTableData";

// Components
import ProductsTable from "./components/ProductsTable/ProductsTable";
import Button from "@/components/ui/button/Button";

// Icons
import { IoMdAdd } from "react-icons/io";

// Styles
import Style from "./ProductsView.module.css";
import { useRouter } from "next/navigation";

// Types
interface Product {
  id: string;
  images: string[];
  productDescription: string;
  productInventory: number;
  productName: string;
  productColor: string;
  productPrice: number;
  selectedCategories: string[];
}

const OrdersView: React.FC = () => {
  const { data: products, error } = useTableData<Product>("products");
  const router = useRouter();

  return (
    <>
      <div className={Style.header}>
        <h4>Products</h4>
        <div className={Style.btns}>
          <Button
            text="Add Product"
            icon={<IoMdAdd size={20} />}
            onClick={() => router.push("add-product")}
          />
        </div>
      </div>
      <section className={Style.table}>
        <ProductsTable products={products} />
      </section>
    </>
  );
};

export default OrdersView;
