"use client";

import React from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Wrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <body
      className="flex flex-col "
      onClick={() => {
        if (sidebarOpen) {
          setSidebarOpen(false);
        }
      }}
    >

      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex h-[calc(100dvh-54px)] overflow-clip">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="overflow-y-scroll w-full no-scrollbar"> 
        {children}

        </div>
      </div>
    </body>
  );
}
