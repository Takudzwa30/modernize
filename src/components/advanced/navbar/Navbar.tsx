"use client";

// Libraries
import { useState } from "react";
import Image from "next/image";

// Hooks
import useWindowSize from "@/hooks/useWindowSize";
import { useUser } from "@/contexts/UserContext";

// Icons
import { IoSearch } from "react-icons/io5";
import { GrChat } from "react-icons/gr";
import { GoBell } from "react-icons/go";
import { BiChevronDown } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";

// Logo
import logo from "@/assets/logos/logo.png";
import logoHalf from "@/assets/logos/logoHalf.png";

// Images
import dummyProfile from "@/assets/images/profileDummy.png";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser, verifyEmail } = useUser();


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

        <div
          className={Style.avatar}
          onClick={() => setDropdownOpen((old) => !old)}
        >
          <div
            className={Style.picture}
            style={{
              backgroundImage: user?.photoURL
                ? `url(${user.photoURL && user.photoURL})`
                : `url(${dummyProfile.src})`,
            }}
          />
          <div
            className={dropdownOpen ? Style.menuOpen : Style.menu}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={Style.content}>
              <div className={Style.title}>
                Welcome! <br />
                <span>@xeriya </span>
              </div>
              <div className={Style.bid}>
                <div className={Style.id}>ID: 4234234</div>
              </div>
              <div className={Style.item}>
                <HiOutlineUser />
                Go to profile
              </div>
              <div
                style={{
                  margin: "40px",
                  color: "blue",
                  border: "1px solid blue",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  width: "fit-content",
                }}
                onClick={verifyEmail}
              >
                VERIFY
              </div>
              <div onClick={signOutUser} className={Style.item}>
                <MdLogout />
                Logout
              </div>
            </div>
          </div>
          <div>
            <div className={!dropdownOpen ? Style.action : Style.actionOpen}>
              <div className={Style.username}>{user?.displayName}</div>
              <BiChevronDown />
            </div>
          </div>
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
