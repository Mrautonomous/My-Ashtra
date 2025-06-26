"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useRegistrationStore from "../../../../store/buisnessFormStore";

const services = [
  { id: "Hair", label: "Hair", icon: "/services.svg" },
  { id: "Nails", label: "Nails", icon: "/services.svg" },
  { id: "Massage", label: "Massage", icon: "/services.svg" },
  { id: "Skin", label: "Skin", icon: "/services.svg" },
  { id: "Makeup", label: "Makeup", icon: "/services.svg" },
  { id: "Spa", label: "Spa", icon: "/services.svg" },
];

function Services() {
  const router = useRouter();
  const { setUserData } = useRegistrationStore();
  const [select, setSelect] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (select.length === 0) return alert("Please select at least one");
    setUserData({ serviceCategories: select });
    router.push("/employees");
  };

  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col justify-center items-center rounded-xl shadow-md mt-[40px] h-[650px] w-[896px]  px-[24px] py-[40px]"
        >
          <div className="flex text-center mb-[40px] space-x-4">
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
          </div>
          <h2 className="text-2xl font-bold  text-center">
            What services do you provide?
          </h2>
          <p className="text-sm text-gray-500 font-[400] text-[16px] max-w-431 text-center mt-[16px]">
            Choose from the services below to tailor your trial experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-6">
            {services.map((service) => {
              const isChecked = select.includes(service.id);

              const handleToggle = () => {
                setSelect((prev) =>
                  prev.includes(service.id)
                    ? prev.filter((item) => item !== service.id)
                    : [...prev, service.id]
                );
              };

              return (
                <label
                  key={service.id}
                  onClick={handleToggle}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition border
                    ${
                      isChecked
                        ? "bg-[#F2F3F5] border-blue-500"
                        : "border-gray-400"
                    }
                    hover:shadow-sm`}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={service.icon}
                      width={20}
                      height={20}
                      alt="image"
                      className="text-2xl"
                    />
                    <span className="font-medium">{service.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    name="service"
                    value={service.id}
                    checked={isChecked}
                    readOnly
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                </label>
              );
            })}
          </div>
          <button
            type="submit"
            className="w-[431px] cursor-pointer h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
}

export default Services;
