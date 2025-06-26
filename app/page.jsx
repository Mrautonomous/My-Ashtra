"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/authStore";

const Hero = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore.persist.hasHydrated(); // Zustand persist hydration check
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!hasHydrated) return; // Wait for hydration
    if (!isAuthenticated) {
      router.push("/emailandpass");
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, hasHydrated, router]);

  if (!hasHydrated || checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

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
