"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "../../../hooks/useRegisterUser"; // <-- make sure this exists
import useAuthStore from "../../../../store/authStore"; // <-- import your store

function EmailPass() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLoginMutation();
  const login = useAuthStore((state) => state.login);

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await mutation.mutateAsync(userData);

      const { accessToken, refreshToken, user, role, businessId } =
        response.data;

      // Use Zustand store for auth state
      login({ user: { ...user, role, businessId }, accessToken, refreshToken });

      // Redirect to dashboard (or wherever you want)
      router.push("/"); // or router.push("/")
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white flex flex-col justify-center items-center rounded-xl shadow-md mt-[40px] max-h-[552px] max-w-[479px] px-[24px] py-[40px]">
        <div className="flex flex-col items-center mt-[42px] justify-center">
          <Image src="/Workspace.svg" width={73} height={18} alt="image" />
          <Image src="/Group.svg" width={124} height={23} alt="image" />
        </div>
        <form className="mt-[40px]" onSubmit={handleNext}>
          <input
            type="text"
            placeholder="Enter Email/Phone number"
            className="w-full h-[56px] border border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[56px] border mt-[16px] border-[#E6E8EB] bg-[#E6E8EB] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer h-[56px] mt-[40px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Next
          </button>
          <label htmlFor="remember-pass" className="m-2 flex">
            <input
              type="checkbox"
              name="remember-pass"
              id="remember-pass"
              className="m-1"
            />
            Remember Password
          </label>
        </form>
        <Link href="" className="text-blue-700 mt-[36px] mb-[12px]">
          Forgot Password?
        </Link>
        <p>
          Don’t have an account?{" "}
          <Link href="/get-started" className="text-blue-700 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default EmailPass;
