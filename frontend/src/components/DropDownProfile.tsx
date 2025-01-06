import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { House, LayoutDashboard, LogOut, Settings, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const DropDownProfile = () => {
  const { signout, user, isLoading } = useAuth();  // Usamos isLoading aquí
  const [isDropOpen, setIsDropOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDropOpen) closeDrop();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDropOpen]);

  const openDrop = () => setIsDropOpen((prev) => !prev);
  const closeDrop = () => setIsDropOpen(false);

  const links = [
    { icon: <House />, reference: "Home", to: "/" },
    { icon: <LayoutDashboard />, reference: "Dashboard", to: "/dashboard" },
    { icon: <Settings />, reference: "Settings", to: "/dashboard/settings" },
  ];

  const handleSignOut = async () => {
    try {
      await signout();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error while signing out:", error);
    }
  };

  const menuItemStyle =
    "flex gap-1.5 items-center cursor-default px-1 py-2 text-sm font-semibold rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-slate-800";

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.90,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Muestra un spinner o loading mientras isLoading es true */}
      {isLoading ? (
        <div className="flex items-center justify-center w-7 h-7 border-4 border-t-transparent border-neutral-100 rounded-full animate-spin" />
      ) : (
        <>
          {user ? (
            <div className="relative flex">
              <button className="relative z-10" onClick={openDrop}>
                <UserCircle className="size-7" />
              </button>

              {isDropOpen && (
                <div
                  onClick={closeDrop}
                  className="fixed inset-0 z-0"
                  aria-hidden="true"
                ></div>
              )}

              {/* Dropdown Menu */}
              {isDropOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute right-0 z-20 px-2 mt-2 bg-white rounded-md shadow-lg opacity-100 border-neutral-800 top-5 w-60 dark:bg-neutral-950 dark:border-zinc-300"
                >
                  <div className="pt-4 mb-2 border-b border-neutral-200 dark:border-neutral-800">
                    <p className="text-[15px] text-neutral-900 font-semibold dark:text-neutral-100">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                    <p className="mb-2 text-sm opacity-75 text-neutral-900 dark:text-neutral-100">
                      {user?.email}
                    </p>
                  </div>

                  {links.map((link) => (
                    <Link
                      key={link.reference}
                      to={link.to}
                      onClick={closeDrop}
                      className={`${menuItemStyle}`}
                    >
                      {link.icon} {link.reference}
                    </Link>
                  ))}

                  <button
                    onClick={handleSignOut}
                    className={`${menuItemStyle} w-full mb-4`}
                    type="button"
                  >
                    <LogOut /> Sign out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="signin"
              className="flex items-center gap-2 text-md px-4 py-1.5 font-semibold 
                         bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full 
                         transition ease-in-out hover:scale-105"
            >
              Get started
            </Link>
          )}
        </>
      )}
    </>
  );
};
