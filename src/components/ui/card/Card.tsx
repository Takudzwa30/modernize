import { ReactNode } from "react";

// Styles
import Style from "./Card.module.css";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={Style.card}>{children}</div>;
};

export default Card;
