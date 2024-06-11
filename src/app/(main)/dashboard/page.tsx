import { Metadata } from "next";

// Components
import Loader from "@/components/advanced/loader/Loader";
import DashboardView from "./DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Home: React.FC = () => {
  return (
    <Loader>
      <DashboardView />
    </Loader>
  );
};

export default Home;
