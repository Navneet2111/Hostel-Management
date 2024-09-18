import React from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { Popover, Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import { Navigate, useNavigate } from "react-router-dom";

export default function Header() {
  const nevigate = useNavigate();

  return (
    <div className=" flex h-16 px-4 justify-between items-center border-b bg-slate-300 border-blue-300">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-3 "
        />
        <input
          type="text"
          placeholder="Search Here...! "
          className="text-sm focus:outline-none active:outline-none h-10 w-56 border border-gray-400 rounded-lg pl-11 px-4"
        />
      </div>
      <div className="flex items-center gap-4 mr-3">
  
        <Popover className=" relative ">
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of the chevron icon. */
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  " p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                {/* <HiOutlineChatAlt fontSize={24} /> */}
              </Popover.Button>

              <Transition
                as={React.Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-88">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="texr-gray-700 font-medium">
                      {" "}
                      Messages
                    </strong>

                    <div className="mt-2 py-1 text-sm">
                      This is Message panel ...!
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className=" relative ">
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of the chevron icon. */
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  " p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                {/* <HiOutlineBell fontSize={24} /> */}
              </Popover.Button>

              <Transition
                as={React.Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-88">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="texr-gray-700 font-medium">
                      Notification
                    </strong>

                    <div className="mt-2 py-1 text-sm">
                      This is Notification panel ...!
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative ">
          <div>
            <Menu.Button className=" ml-2 inline-flex  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600  ">
              <span className="sr-only"> Open user Menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7UazQvybw2e-tIlfBFSqFp298xJ-aSE9oAw&usqp=CAU")`,
                }}
              >
                <span className="sr-only">Huge Jackson</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-xl shadow-sm p-1  bg-gray-50 ring-1 ring-opacity-5 ring-black focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-300",
                        "text-gray-700 focus:bg-gray-200  cursor-pointer round-sm px-4 py-2"
                      )}
                      onClick={() => Navigate("/profile")}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-300",
                        "text-gray-700 focus:bg-gray-200  cursor-pointer round-sm px-4 py-2"
                      )}
                      onClick={() => Navigate("/Settting")}
                    >
                      Setting
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item className="text-red-700">
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && "bg-gray-300",
                        "text-gray-700 focus:bg-gray-200  cursor-pointer round-sm px-4 py-2"
                      )}
                      onClick={() => Navigate("/logout")}
                    >
                      Logout!
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
