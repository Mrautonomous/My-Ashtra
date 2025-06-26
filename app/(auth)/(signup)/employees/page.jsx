"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useRegistrationStore from "../../../../store/buisnessFormStore";

const employees = [
  {
    label: "1-3",
    value: "1-3",
  },
  {
    label: "4-10",
    value: "4-10",
  },
  {
    label: "10+",
    value: "10+",
  },
];

function Employees() {
  const [range, setRange] = useState("4-10");
  const { setUserData } = useRegistrationStore();
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    if (!range) return alert("Select the Range of Employees");
    setUserData({ employeeRange: range });
    router.push("/ph-no");
  };
  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-[44px] justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white flex flex-col justify-center items-center rounded-xl p-[40px] shadow-md mt-[151px] h-[420px] w-[736px]">
          <div className="flex text-center mb-[32px] space-x-4">
            <div className="h-[6px] w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-[6px] w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-[6px] w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-[6px] w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-[6px] w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-[6px] w-[61px] rounded-full bg-blue-100"></div>
          </div>

          <h2 className="text-[25px] max-w-[665px] font-semibold text-center mb-[46px]">
            What is the total numbers of service providers in your saloon?
          </h2>
          <form onSubmit={handleNext}>
            <div className="flex gap-4 ">
              {employees.map((e) => {
                const isSelected = range === e.value;
                return (
                  <label
                    key={e.value}
                    className={`flex justify-center items-center text-[50px] relative w-[200px] h-[128px] cursor-pointer rounded-xl px-6 py-4 text-center transition-colors border ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="range"
                      value={e.value}
                      checked={isSelected}
                      onChange={() => setRange(e.value)}
                      className="sr-only"
                    />
                    <span className="text-lg font-medium">{e.label}</span>

                    <span
                      className={`absolute top-2 right-2 h-5 w-5 rounded-full border ${
                        isSelected ? "border-blue-500" : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute inset-1 rounded-full bg-blue-500" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            <button
              type="submit"
              className="w-[431px] ml-25 cursor-pointer h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Employees;
