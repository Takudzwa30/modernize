// Icons
import { IoDocument } from "react-icons/io5";
import { IoHome, IoStatsChartSharp, IoPerson, IoRocketSharp } from "react-icons/io5";
import { BsFillCreditCardFill } from "react-icons/bs";

export const sidebarCategories = [
  {
    routes: [
      {
        path: "/",
        title: "Dashboard",
        subRoutes: [],
        icon: <IoHome />,
      },
      {
        path: "/tables",
        title: "Tables",
        subRoutes: [],
        icon: <IoStatsChartSharp />,
      },
      {
        path: "/billing",
        title: "Billing",
        subRoutes: [],
        icon: <BsFillCreditCardFill />,
      },
    ],
  },
  {
    categoryTitle: "Account",
    routes: [
      {
        path: "/profile",
        title: "Profile",
        subRoutes: [],
        icon: <IoPerson />,
      },
      {
        path: "/signin",
        title: "Sign In",
        subRoutes: [],
        icon: <IoDocument />,
      },
      {
        path: "/signup",
        title: "Sign Up",
        subRoutes: [],
        icon: <IoRocketSharp />,
      },
    ],
  },
];
