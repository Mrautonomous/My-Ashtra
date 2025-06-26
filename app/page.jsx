//app/page.jsx

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/authStore";
import DashboardSkeleton from "../components/HomeSkeleton";

const Hero = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/emailandpass");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col h-screen justify-center items-center">
        <Image
          src="/Workspace.svg"
          width={201}
          height={51}
          alt="Ashtra"
          className="text-right"
        />
        <Image src="/Group.svg" width={340} height={65} alt="Workspace" />
      </main>
    </>
  );
};

export default Hero;
