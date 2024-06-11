// Styles
import Card from "@/components/ui/card/Card";
import Style from "./Cards.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface CardsProps {
  title: string;
  value: number;
  percentage: number;
  change: boolean;
}

const Cards: React.FC<CardsProps> = ({ title, value, percentage, change }) => {
  return (
    <Card>
      <div className={Style.cards}>
        <p>Existing Users</p>
        <h5>5.653</h5>
        <div className={change ? Style.increase : Style.decrease}>
          <p>22.45%</p>
          <IoIosArrowDown />
        </div>
      </div>
    </Card>
  );
};

export default Cards;
