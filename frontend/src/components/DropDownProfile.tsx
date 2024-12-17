import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import Loading from "./Loading";

export const DropDownProfile = () => {
  const { session, isLoading, signout, user } = useAuth();
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
    { icon: <TiHomeOutline />, name: "Home", to: "/" },
    { icon: <MdOutlineDashboard />, name: "Dashboard", to: "/dashboard" },
    { icon: <IoSettingsOutline />, name: "Settings", to: "/dashboard/settings" },
  ];

  const handleSignOut = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error while signing out:", error);
    }
  };

  if (isLoading) return <Loading />;

  const menuItemStyle =
    "flex gap-1.5 items-center cursor-default px-1 py-2 text-sm font-semibold rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-slate-800";

  return (
    <>
      {session ? (
        <div className="relative flex">
          <button className="relative z-10" onClick={openDrop}>
            <FaUserCircle className="size-7" />
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
            <div
              className="absolute right-0 z-20 px-2 mt-2 transition duration-300 ease-in-out origin-top transform scale-y-100 bg-white rounded-md shadow-lg opacity-100 border-neutral-800 top-5 w-60 dark:bg-neutral-950 dark:border-zinc-300"
            >
              <div className="pt-4 mb-2 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-[15px] text-neutral-900 font-semibold dark:text-neutral-100">
                  {user?.full_name}
                </p>
                <p className="mb-2 text-sm opacity-75 text-neutral-900 dark:text-neutral-100">
                  {user?.email}
                </p>
              </div>

              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={closeDrop}
                  className={`${menuItemStyle}`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}

              <button
                onClick={handleSignOut}
                className={`${menuItemStyle} w-full`}
                type="button"
              >
                <IoMdLogOut /> Sign out
              </button>
            </div>
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
  );
};
