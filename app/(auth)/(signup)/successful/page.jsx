import Image from "next/image";
import Link from "next/link";
import React from "react";

function Successful() {
  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-">
        <div className="bg-white flex flex-col justify-center items-center rounded-xl shadow-md mt-[40px] h-[352px] w-[479px]  px-[24px] py-[40px]">
          <Image
            src="/tick-circle.svg"
            width={62}
            height={62}
            alt="tick-circle"
          />
          <h2 className="text-2xl font-bold mt-[10px] text-center">
            Account Created Successfully
          </h2>
          <p className="text-sm text-gray-500 font-[400] text-[16px] max-w-[361px] text-center mt-[16px]">
            Welcome to Ashtra! Your account is created. You can get started to
            explore Ashtra’s Workspace.{" "}
          </p>

          <Link href="http://localhost:3000/">
            <button
              type="submit"
              className="w-[431px] gap-3 cursor-pointer flex justify-center items-center  h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Get Started{" "}
              <Image
                src="/arrow.svg"
                width={14}
                height={11}
                alt="arrow"
                className="mt-1"
              />
            </button>
          </Link>
        </div>
      </div>
      );
    </>
  );
}

export default Successful;
