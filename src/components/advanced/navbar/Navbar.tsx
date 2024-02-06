"use client";

// Libraries
import Image from "next/image";

// Hooks
import useWindowSize from "@/hooks/useWindowSize";

// Icons
import { IoSearch } from "react-icons/io5";
import { GrChat } from "react-icons/gr";
import { GoBell } from "react-icons/go";

// Logo
import logo from "@/assets/logos/logo.png";
import logoHalf from "@/assets/logos/logoHalf.png";

// Images
import avatar from "@/assets/images/avatar.png";

// Styles
import Style from "./Navbar.module.css";

// Types
interface SidebarProps {
  setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarIsOpen: boolean;
}

const Navbar: React.FC<SidebarProps> = ({
  sidebarIsOpen,
  setSidebarIsOpen,
}) => {
  const { width } = useWindowSize();
  const logoImage = width && width > 767 ? logo : logoHalf;
  return (
    <div className={Style.navBarWrapper}>
      <div className={Style.leftNav}>
        <Image src={logoImage} alt="Logo" />
        <div className={Style.searchFieldWrapper}>
          <IoSearch />
          <input placeholder="Search..." type="text" />
        </div>
      </div>
      <div className={Style.nav}>
        <div className={Style.messages}>
          <GrChat />
          <div className={Style.notificationsValue}>2</div>
        </div>
        <div className={Style.messages}>
          <GoBell />
          <div className={Style.notificationsValue}>5</div>
        </div>
        <div className={Style.user}>
          <Image src={avatar} alt="profile picture" />
          <p>X’eriya Ponald</p>
        </div>
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
