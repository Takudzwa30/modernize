import { Metadata } from "next";

// Components
import Loader from "@/components/advanced/loader/Loader";
import AddProductView from "./AddProductView";

export const metadata: Metadata = {
  title: "Add Product",
};

const Home: React.FC = () => {
  return (
    <Loader>
      <AddProductView />
    </Loader>
  );
};

export default Home;
