import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  ADMIN_DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/constants/navigation";
import image from "../../assets/image.png";

const Layout = () => {
  return (
    <div className=" flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar
        sidebarLinks={ADMIN_DASHBOARD_SIDEBAR_LINKS}
        bottomLinks={ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS}
        image={image}
      />

      <div className=" flex-1">
        <Header />
        <div className=" p-4">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Layout;
