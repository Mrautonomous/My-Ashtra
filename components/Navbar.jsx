"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoutButton from "./Logout";
import Link from "next/link";
import useLoginStore from "../store/businessLoginStore";
import useAuthStore from "../store/authStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const [firstName, setFirstName] = useState(null);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setFirstName(user?.firstName);
    }
  }, []);

  return (
    <nav className="bg-[#F1F2F4] h-[62px] flex items-center justify-between border border-[#C9CED6] px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start items-center max-w-[1030px]  overflow-x-auto scrollbar-hide">
        <div className="flex flex-col justify-center items-center p-[26px] flex-shrink-0">
          <Image
            src="/Workspace.svg"
            width={55}
            height={13}
            alt="Ashtra-Workspace"
          />
          <Image
            src="/Group.svg"
            width={94}
            height={17}
            alt="Ashtra-Workspace"
          />
        </div>
        <div className="flex gap-8 sm:gap-6 whitespace-nowrap">
          <div className="flex justify-center cursor-pointer items-center gap-2">
            <Image src="/calendar.svg" width={24} height={24} alt="" />
            <span className=" text-[16px] font-medium">Calendar</span>
          </div>
          <div className="flex justify-center cursor-pointer items-center gap-2">
            <Image src="/money-send.svg" width={24} height={24} alt="" />
            <span className="text-[16px] font-medium">Sales</span>
          </div>
          <div className="flex justify-center items-center cursor-pointer font-medium gap-2">
            <Image src="/people.svg" width={24} height={24} alt="" />
            <span className="text-[16px] font-medium">Customers</span>
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-2 font-medium">
            <Image src="/menu.svg" width={24} height={24} alt="" />
            <Link href="/feeds">
              <span className="text-[16px] font-medium">Feeds</span>
            </Link>
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-2 font-medium">
            <Image src="/document-text.svg" width={24} height={24} alt="" />
            <span className="text-[16px] font-medium">Reports</span>
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-2 font-medium">
            <Image src="/element-3.svg" width={24} height={24} alt="" />
            <span className="text-[16px] font-medium">More</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[12px] sm:gap-[12px] flex-shrink-0">
        <Image src="/message.svg" width={20} height={20} alt="" />
        <Image src="/notifications.svg" width={20} height={20} alt="" />

        <div className="w-[106px] h-[54px] border border-t-0 border-b-0 border-l-[#C9CED6] border-r-[#C9CED6] flex justify-center  items-center whitespace-nowrap">
          Saloon
        </div>

        <div className="flex justify-center flex-wrap items-center gap-1.5">
          <div>
            <Image
              src="/DP2.png"
              width={32}
              height={32}
              alt="dp"
              className="rounded-full ml-[10px]"
            />
          </div>
          <div className="min-w-max">
            <h3 className="font-medium text-sm text-[#33363B]">
              {user?.firstName || "User"}
            </h3>
            <p className="text-xs text-[#33363B]">
              <i>Saloon Location</i>
            </p>
          </div>
          <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex justify-center duration-500 items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-2 w-30 bg-white border flex justify-center items-center flex-wrap border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <LogoutButton />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
