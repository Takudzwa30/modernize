import { Metadata } from "next";

// Components
import DashboardView from "./(main)/dashboard/DashboardView";
import Loader from "@/components/advanced/loader/Loader";
import MainLayout from "./(main)/layout";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Loader>
        <DashboardView />
      </Loader>
    </MainLayout>
  );
};

export default Home;
