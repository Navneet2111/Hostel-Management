import React, { useState } from "react";
import {  FiChevronLeft, FiChevronRight  } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-blue-700 hover:no-underline active:bg-neutral-500 rounded-sm text-base";

const Sidebar = ({ sidebarLinks, bottomLinks }) => {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <div className={`${open ? "w-60" : "w-14"} duration-300 bg-gray-600 p-3 flex flex-col text-white`}>
    <div className="flex justify-between">
      <div className="flex justify-between items-center gap-2  py-4">
        {open && <span className="text-xl font-medium"> Hostel Management </span>}
      </div>
      {open ? (
        <FiChevronLeft
          fontSize={25}
          className="text-white flex items-center mt-4 cursor-pointer transform top-3 hover:scale-110"
          onClick={() => {
            setOpen(!open);
          }}
        />
      ) : (
        <FiChevronRight
          fontSize={23}
          className="text-white flex flex-col items-center flex-1  mt-4 cursor-pointer transform  hover:scale-110"
          onClick={() => {
            setOpen(!open);
          }}
        />
      )}
    </div>
      <div className={`${open ? "flex-1 py-8 flex flex-col gap-4 " : " flex-1 py-8 flex flex-col gap-4 items-center"}`}>
        {sidebarLinks.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            pathname={pathname}
            open={open}
          />
        ))}
      </div>

      <div className={`${open ? "flex flex-col gap-1 pt-2 border-t border-neutral-700 "  : "flex flex-col gap-1 pt-2 border-t border-neutral-700 items-center"}`}>
        {bottomLinks.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            pathname={pathname}
            open={open}
          />
        ))}
      </div>
    </div>
  );
};

function SidebarLink({ item, pathname, open }) {
  return (
    <Link
      className={classNames(
        pathname === item.path ? "bg-blue-500 text-white" : "text-white",
        linkClass
      )}
      to={item.path}
    >
      <span className="text-xl">{item.icon}</span>
      {open && <span>{item.label}</span>}
    </Link>
  );
}

export default Sidebar;
