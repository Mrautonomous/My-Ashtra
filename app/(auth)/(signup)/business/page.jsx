"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useRegistrationStore from "../../../../store/buisnessFormStore";

function page() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");

  const { setUserData } = useRegistrationStore();
  const handleNext = (e) => {
    e.preventDefault();
    setUserData({ businessName, website });
    router.push("/service-select");
  };
  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white flex flex-col justify-center items-center rounded-xl shadow-md mt-[40px] h-[452px] w-[479px]  px-[24px] py-[40px]">
          <div className="flex text-center mb-[40px] space-x-4">
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
          </div>
          <h2 className="text-2xl font-bold  text-center">Business Name</h2>
          <p className="text-sm text-gray-500 font-[400] text-[16px] max-w-431 text-center mt-[16px]">
            Add the name of your business and website(if any).
          </p>

          <form className="mt-[40px]" onSubmit={handleNext}>
            <input
              type="text"
              placeholder="Business Name..."
              className="w-full h-[56px] border border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Website URL..."
              className="w-full h-[56px] border mt-[16px] border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full cursor-pointer h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Next
            </button>
          </form>
        </div>
      </div>
      );
    </>
  );
}

export default page;
