import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { MdAddHomeWork, MdWarehouse } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Hostel",
    label: "Hostel", 
    path: "/hostel",
    icon: <MdAddHomeWork />,
  },
  {
    key: "Administrator",
    label: "Administrator",
    path: "/administrator",
    icon: <BsPersonPlusFill />,
  },
  {
    key: "Staff",
    label: "Staff",
    path: "/Staff",
    icon: <HiOutlineUsers />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/setting",
    icon: <HiOutlineCog />,
  },
  {
    key: "Logout",
    label: "Logout",
    path: "/logout",
    icon: <HiOutlineLogout className=" text-red-500" />,
  },
];

export const ADMIN_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin/admindashboard", // Corrected path
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "Students",
    label: "Students",
    path: "/admin/students", // Corrected path
    icon: <GrGroup />,
  },
  {
    key: "Administrator",
    label: "Inventory",
    path: "/admin/inventory", // Corrected path
    icon: <MdWarehouse />,
  },
  {
    key: "Staff",
    label: "Staff",
    path: "/admin/adminstaff", // Corrected path
    icon: <HiOutlineUsers />,
  },
];

export const ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/adminsetting", // Corrected path
    icon: <HiOutlineCog />,
  },

  {
    key: "Logout",
    label: "Logout",
    path: "/admin/adminlogout",
    icon: <HiOutlineLogout className=" text-red-500" />,
  },
];
