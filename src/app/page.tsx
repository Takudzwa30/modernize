// import TeamGrowth from "@/app/dashboard/components/teamGrowth/TeamGrowth";
// import Chart from "@/app/dashboard/components/chart/Chart";
// import { FirstTable } from "./dashboard/components/firstTable/FirstTable";
import CustomTable from "./dashboard/components/customTable/CustomTable";
import Table from "./dashboard/components/table/Table";

export default function Home() {
  return (
    <>
      <h4>HOME</h4>
      {/* <TeamGrowth /> */}
      {/* <Chart /> */}
      <CustomTable />
      <Table />
    </>
  );
}
