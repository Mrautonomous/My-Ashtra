"use client";
import { useRouter } from "next/navigation";
import { logout } from "../app/utils/auth"; // Adjust path

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/emailandpass"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
