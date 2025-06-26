"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useRegistrationStore from "../../../../store/buisnessFormStore";
import { useRegisterUser } from "../../../hooks/useRegisterUser";

function Password() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { userData, setUserData } = useRegistrationStore();

  const mutation = useRegisterUser();

  const handleNext = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setUserData({ password }); // <-- This is the fix

    try {
      await mutation.mutateAsync({ ...userData, password });
      router.push("/successful");
    } catch (err) {
      alert(
        err?.response?.data?.message || "Something is wrong! Please try again"
      );
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-[#F1F2F4] flex flex-col items-center mt-20 justify-center">
        <Image src="/Workspace.svg" width={73} height={18} alt="logo" />
        <Image src="/Group.svg" width={124} height={23} alt="logo" />
      </div>

      <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleNext}
          className="bg-white flex flex-col justify-center items-center rounded-xl shadow-md mt-[40px] h-auto w-[479px] px-[24px] py-[40px]"
        >
          <div className="flex text-center mb-[40px] space-x-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-[61px] rounded-full bg-blue-500"
                />
              ))}
          </div>

          <h2 className="text-2xl font-bold text-center">Create Password</h2>
          <p className="text-sm text-gray-500 font-normal text-center mt-[16px]">
            Create a strong password to make your account secure
          </p>

          <div className="w-full space-y-4 mt-6">
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-200 px-4 py-3 pr-12 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-200 px-4 py-3 pr-12 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
              >
                {showConfirm ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
}

// SVG Icons (you can extract them into separate files/components)
const EyeOpenIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.966 9.966 0 012.292-3.578M9.958 6.022A10.04 10.04 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-1.727 2.58M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M3 3l18 18" />
  </svg>
);

export default Password;
