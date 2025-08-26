"use client"

import React from "react";
import Navbar from "@/components/Navbar";
import FirstVisit from "@/components/FirstVisit";
import ReportPage from "@/components/Response";

function Page() {
  return (
    <div className="w-full h-screen ">
      <Navbar></Navbar>
      <div className="w-full flex justify-center items-center h-full bg-orange-200">
        <FirstVisit></FirstVisit>
        {/* <ReportPage></ReportPage> */}
      </div>
    </div>
  );
}

export default Page;
