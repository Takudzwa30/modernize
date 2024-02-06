"use client";
import React, { useState, ReactNode } from "react";

// Components
import { Sidebar, Navbar } from "@/components/advanced";

// Routes
import { sidebarCategories } from "@/data/routes";

// Styles
import Style from "./LayoutWrapper.module.css";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  // States
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className={Style.navBarWrapper}>
        <Navbar sidebarIsOpen={menuOpen} setSidebarIsOpen={setMenuOpen} />
      </div>
      <div className={Style.mainLayout}>
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
    </div>
  );
};

export default LayoutWrapper;
