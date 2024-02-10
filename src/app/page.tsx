// Components
import Chart from "@/app/dashboard/components/chart/Chart";
import Recent from "./dashboard/components/recent/Recent";
import Country from "./dashboard/components/country/Country";
import Cards from "./dashboard/components/cards/Cards";

// Icons
import { LuSettings } from "react-icons/lu";

// Styles
import Style from "./page.module.css";
import { Loader } from "@/components/advanced";

// Types
interface CardProps {
  title: string;
  value: number;
  percentage: number;
  change: boolean;
}

interface DataItem {
  value: number;
  title: string;
  change: boolean;
  percentage: number;
}

// Data
const data: DataItem[] = [
  {
    value: 5.653,
    title: "Existing Users",
    change: true,
    percentage: 22.45,
  },
  {
    value: 5.653,
    title: "New Users",
    change: true,
    percentage: 22.45,
  },
  {
    value: 5.653,
    title: "Total Visits",
    change: false,
    percentage: 22.45,
  },
  {
    value: 5.653,
    title: "Unique Visits",
    change: false,
    percentage: 22.45,
  },
];

export default function Home() {
  return (
    <Loader>
      <div className={Style.titleWrapper}>
        <h4>Dashboard</h4>
        <div className={Style.manage}>
          <LuSettings />
          <p>Manage</p>
        </div>
      </div>
      <section className={Style.cards}>
        {data.map((item: DataItem, index: number) => {
          return (
            <Cards
              key={index}
              title={item.title}
              value={item.value}
              percentage={item.percentage}
              change={item.change}
            />
          );
        })}
      </section>
      <Chart />
      <section className={Style.recentDistribution}>
        <Recent />
        <Country />
      </section>
    </Loader>
  );
}
