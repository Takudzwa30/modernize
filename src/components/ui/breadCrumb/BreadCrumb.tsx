"use client";
// Libraries
import { useRouter } from "next/navigation";

// Components
import BackButton from "@/assets/svgComponents/BackButton";

// Styles
import Style from "./BreadCrumb.module.css";

// Types
interface BreadCrumbProps {
  buttonTitle: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ buttonTitle }) => {
  const router = useRouter();

  // Handle click
  const handleClick = () => {
    router.back();
  };

  return (
    <div className={Style.crumb} onClick={handleClick}>
      <BackButton />
      <span>{buttonTitle}</span>
    </div>
  );
};

export default BreadCrumb;
