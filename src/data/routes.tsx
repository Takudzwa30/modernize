// Icons
import { IoDocument } from "react-icons/io5";
import {
  IoHome,
  IoStatsChartSharp,
  IoPerson,
  IoRocketSharp,
} from "react-icons/io5";
import { GrChat } from "react-icons/gr";
import { FaRegFolder, FaRegCircleQuestion } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { PiChartBarBold } from "react-icons/pi";
import { HiOutlineUsers, HiOutlineUser } from "react-icons/hi2";
import { IoPricetagOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiHome, FiAward } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";


export const sidebarCategories = [
  {
    routes: [
      {
        path: "/",
        title: "Dashboard",
        subRoutes: [],
        icon: <FiHome />,
      },
      {
        title: "Orders",
        subRoutes: [],
        icon: <TfiMenuAlt />,
      },
      {
        title: "Products",
        subRoutes: [],
        icon: <IoPricetagOutline />,
      },
      {
        title: "Categories",
        subRoutes: [],
        icon: <FaRegFolder />,
      },
      {
        title: "Customers",
        subRoutes: [],
        icon: <HiOutlineUsers />,
      },
      {
        title: "Reports",
        subRoutes: [],
        icon: <PiChartBarBold />,
      },
      {
        title: "Coupons",
        subRoutes: [],
        icon: <IoStarOutline />,
      },
      {
        title: "Inbox",
        subRoutes: [],
        icon: <GrChat />,
      },
    ],
  },
  {
    categoryTitle: "Other Information",
    routes: [
      {
        title: "Knowledge Base",
        subRoutes: [],
        icon: <FaRegCircleQuestion />,
      },
      {
        title: "Product Updates",
        subRoutes: [],
        icon: <FiAward />,
      },
    ],
  },
  {
    categoryTitle: "Settings",
    routes: [
      {
        title: "Personal Settings",
        subRoutes: [],
        icon: <HiOutlineUser />,
      },
      {
        title: "Global Settings",
        subRoutes: [],
        icon: <LuSettings />,
      },
    ],
  },
];
