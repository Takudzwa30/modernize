"use client";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Libraries
import Link from "next/link";

// Routes
import { sidebarCategories } from "@/data/routes";

// Icons
import { IoPerson, IoNotifications, IoSearch } from "react-icons/io5";

// Logo
import logo from "@/assets/logos/logo.png";

// Styles
import Style from "./Navbar.module.css";
import Image from "next/image";

// Types
interface SidebarProps {
  setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarIsOpen: boolean;
}

const Navbar: React.FC<SidebarProps> = ({
  sidebarIsOpen,
  setSidebarIsOpen,
}) => {
  // Hooks
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Functions
  const getPageTitle = (currentPath: string) => {
    for (const category of sidebarCategories) {
      for (const route of category.routes) {
        if (route.path === currentPath) {
          return route.title;
        }
      }
    }
    return "Unknown Page";
  };

  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window?.scrollY > 0;
      setIsScrolled(scrolled);
    };
    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        // isScrolled ? Style.navBarScrolled :
        Style.navBarWrapper
      }
    >
      <Image src={logo} alt="Logo" />
      <div className={Style.nav}>
        <div className={Style.searchFieldWrapper}>
          <IoSearch />
          <input placeholder="Type here..." type="text" />
        </div>
        <Link href={"/signin"} className={Style.signin}>
          <IoPerson />
          <p>Sign In</p>
        </Link>
        <IoNotifications className={Style.navIcon} />
        <div
          className={sidebarIsOpen ? Style.hamburgerActive : Style.hamburger}
          onClick={() => {
            setSidebarIsOpen((old: boolean) => !old);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
