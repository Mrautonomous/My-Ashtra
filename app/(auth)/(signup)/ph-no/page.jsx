"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useRegistrationStore from "../../../../store/buisnessFormStore";

function page() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { setUserData } = useRegistrationStore();

  const handleNext = (e) => {
    e.preventDefault();
    setUserData({ phone });
    router.push("/password");
  };
  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center  bg-gray-100 p-4">
        <div className="bg-white flex flex-col justify-center p-4 items-center rounded-xl shadow-md mt-[40px] h-[400px]  w-[479px]  px-[24px] py-[40px]">
          <div className="flex text-center mb-[40px] space-x-4">
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
          </div>
          <h2 className="text-2xl font-bold  text-center">Phone number</h2>
          <p className="text-sm text-gray-500 font-[400] text-[16px] max-w-431 text-center mt-[16px]">
            We'll send a text message to verify your account.{" "}
          </p>

          <form className="mt-[40px]" onSubmit={handleNext}>
            <span className="">Phone Number</span>
            <div className="flex bg-[#E6E8EB] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <select name="countryCode" id="countryCode">
                <option value="92">+92</option>
                <option value="93">+93</option>
                <option value="1">+1</option>
                <option value="2">+2</option>
                <option value="4">+4</option>
              </select>
              <input
                type="number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Enter your phone number"
                required
                className="no-spinner w-[380px] h-[56px] border border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
