import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Layers, ChartPie, Settings } from "lucide-react";
import whiteCurvedImg from "/white-curved.jpeg";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: Layers },
  { name: "Reports", href: "/reports", icon: ChartPie },
  { name: "Settings", href: "/settings", icon: Settings },
];

const SidebarToggle = ({ toggleSidebar }) => (
  <button
    onClick={toggleSidebar} // Add click event to toggle sidebar
    data-drawer-target="logo-sideNavbar"
    data-drawer-toggle="logo-sideNavbar"
    aria-controls="logo-sideNavbar"
    type="button"
    className="inline-flex items-center p-2 text-sm text-blue-600 rounded-lg sm:hidden hover:bg-blue-600 hover:text-white hover:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span className="sr-only">Open sideNavbar</span>
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
);

const NavItem = ({ item, isActive }) => (
  <li>
    <Link
      to={item.href}
      className={`flex items-center p-2 rounded-lg transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 dark:text-gray-300"
      }`}
    >
      <item.icon
        className={`w-5 h-5 ${isActive ? "text-white" : "dark:text-gray-300"}`}
      />
      <span className="ms-3">{item.name}</span>
    </Link>
  </li>
);

const SideNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-start rtl:justify-end sm:hidden bg-transparent py-2 bg-slate-100 dark:bg-gray-900">
        <SidebarToggle toggleSidebar={() => setIsOpen(!isOpen)} />
        <a href="/" className="flex py-2 pl-4">
          <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt="Logo" />
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            POS.
          </span>
        </a>
      </div>

      <aside
        id="logo-sideNavbar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-sm sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="SideNavbar"
      >
        <div className="h-full flex flex-col px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="flex items-center mb-3 sm:hidden">
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5  inline-flex justify-center items-center w-6 h-6 text-blue-900 dark:text-white  pt-2"
              data-dismiss-target="#dropdown-cta"
              aria-label="Close"
              onClick={closeSidebar}
            >
              <span className="sr-only transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Close
              </span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <a href="/" className="flex items-center ps-2.5 mb-10">
            <img src="/logo.svg" className="h-6 me-3 sm:h-7" alt="Logo" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              POS.
            </span>
          </a>
          <ul className="space-y-2 font-medium flex-grow">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </ul>

          <div
            className="mt-auto p-4 rounded-xl bg-cover bg-center dark:bg-gray-700"
            style={{ backgroundImage: `url(${whiteCurvedImg})` }}
          >
            <Button className="rounded-xl mb-3 w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
              <a href="#">Upgrade to Pro</a>
            </Button>
            <p className="text-sm text-gray-900 ">
              Unlock exclusive tools and advanced  features.
            </p>
          </div>

          <hr className="my-2 border-gray-200 dark:border-gray-600" />
          <div className="flex justify-between items-center w-full mt-1">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
