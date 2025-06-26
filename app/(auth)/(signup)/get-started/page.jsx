"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import userRegistrationStore from "../../../../store/buisnessFormStore";

function page() {
  const router = useRouter();
  const { setUserData } = userRegistrationStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    setUserData({ ownerFullName: name, ownerEmail: email });
    router.push("/business");
  };

  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-md mt-[40px] h-[452px] w-[479px]  px-[24px] py-[40px]">
          <h2 className="text-2xl font-bold  text-center">
            Try Ashtra’s Workspace for free
          </h2>
          <p className="text-sm text-gray-500 font-[400] text-[16px] max-w-431 text-center mt-[16px]">
            See Mangomint in action instantly with pre-populated sample data. No
            credit card required. Free for 21 days.
          </p>

          <form className="mt-[40px]" onSubmit={handleNext}>
            <input
              type="text"
              placeholder="Full name"
              className="w-full h-[56px] border border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[56px] border mt-[16px] border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full cursor-pointer h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 duration-200 text-white font-medium py-2 rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      );
    </>
  );
}

export default page;
