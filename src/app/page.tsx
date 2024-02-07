import Chart from "@/app/dashboard/components/chart/Chart";
import Recent from "./dashboard/components/recent/Recent";
import Country from "./dashboard/components/country/Country";

// Icons
import { LuSettings } from "react-icons/lu";

// Styles
import Style from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={Style.titleWrapper}>
        <h4>Dashboard</h4>
        <div className={Style.manage}>
          <LuSettings />
          <p>Manage</p>
        </div>
      </div>
      <Chart />
      <section className={Style.recentDistribution}>
        <Recent />
        <Country />
      </section>
    </>
  );
}
