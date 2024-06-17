"use client";
import React, { useState } from "react";

// Components
import { Sidebar, Navbar } from "@/components/advanced";

// Routes
import { sidebarCategories } from "@/data/routes";

// Styles
import Style from "./LayoutWrapper.module.css";

const LayoutWrapper = ({ children }) => {
  // States
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={Style.mainLayout}>
        <div className={Style.navBarWrapper}>
          <Navbar sidebarIsOpen={menuOpen} setSidebarIsOpen={setMenuOpen} />
        </div>
        <div className={menuOpen ? Style.sideBarOpen : Style.sideBar}>
          <Sidebar
            sidebarIsOpen={menuOpen}
            setSidebarIsOpen={setMenuOpen}
            sidebarCategories={sidebarCategories}
          />
        </div>
        <div className={Style.contentNavBar}>
          <div className={Style.outlet}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
