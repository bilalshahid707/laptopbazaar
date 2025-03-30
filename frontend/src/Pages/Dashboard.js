import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const Dashboard = () => {

  return (
    <main>
      <div className="flex max-w-screen-xl mx-auto">
        <div className="sidebar w-[20%] h-[100vh] bg-blue p-4 custom-flex">
          <ul className="w-full">
            <Link to={'/dashboard/settings'} className="sidebar-item">
              <li className=" p-4 w-full text-center text-white active:bg-white active:text-blue">
                Settings
              </li>
            </Link>
            <Link to={'/dashboard/manage-laptops'} className="sidebar-item">
              <li className="p-4 w-full text-center text-white">Manage Products</li>
            </Link>
            <Link to={'/dashboard/all-users'} className="sidebar-item">
              <li className="p-4 w-full text-center text-white">All Users</li>
            </Link>
          </ul>
        </div>
        <div className="w-[80%] h-[100vh] overflow-scroll">
        <Outlet />
        </div>
      </div>
      </main>
  );
};

export default Dashboard;
