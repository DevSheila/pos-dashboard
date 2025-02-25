import React from "react";
import SideNavbar from "@/components/SideNavbar";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen bg-gray-100 dark:bg-gray-900 ">

      <SideNavbar />
      <div className="  bg-gray-100 dark:bg-gray-900 lg:ml-64 md:ml-64 sm:ml-0 lg:p-6 md:p-6 sm:p-0">
        <main className="mx-auto max-w-screen-xl lg:px-4 md:px-4 sm:px-0 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
