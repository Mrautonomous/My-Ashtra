"use client";

import Image from "next/image";
import Link from "next/link";

import React, { useState, useRef, useEffect } from "react";

function page() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120); // 2 minutes countdown
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer as mm:ss
  const formatTimer = () => {
    const m = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const s = (timer % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle input change
  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return; // Only one digit (0-9)

    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    // Move focus to next input
    if (val && idx < 3) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Handle backspace key to move back
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  // Resend code handler
  const resendCode = () => {
    setTimer(120);
    setCode(["", "", "", ""]);
    inputsRef.current[0].focus();
    // TODO: Trigger resend code API call here
  };

  // Next button handler
  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode.length < 4) {
      alert("Please enter the full 4-digit code");
      return;
    }
    // TODO: Verify code API call here
    alert(`Verifying code: ${verificationCode}`);
  };
  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-[44px] mb-[144px] justify-center ">
        <Image src="/Workspace.svg" width={73} height={18} alt="image" />
        <Image src="/Group.svg" width={124} height={23} alt="image" />
      </div>
      <div className="max-h-screen flex items-center justify-center  bg-gray-100 p-4">
        <div className="max-w-[479px] h-[418px]  mx-auto p-6 bg-white rounded-2xl shadow-lg text-center font-sans">
          {/* Progress bar */}
          <div className="flex justify-between">
            <div className="flex text-center mb-[20px] space-x-4">
              <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
              <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
              <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
              <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
              <div className="h-2 w-[61px] rounded-full bg-blue-500"></div>
              <div className="h-2 w-[61px] rounded-full bg-blue-100"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2">Verify account</h2>
          <p className="text-gray-500 mb-6 px-4">
            A verification code has been sent to your phone number.
            <br />
            Please add the code to verify your account.
          </p>

          {/* Code inputs */}
          <div className="flex justify-center space-x-4 mb-6">
            {code.map((num, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={num}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
              />
            ))}
          </div>

          {/* Timer and resend */}
          <div className="mb-6 text-green-600 font-mono">{formatTimer()}</div>
          <button
            onClick={resendCode}
            className="cursor-pointer text-sm underline text-gray-700 mb-6"
            disabled={timer > 0}
          >
            Resend code
          </button>

          {/* Next button */}
          <Link href="/password">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
      );
    </>
  );
}

export default page;
