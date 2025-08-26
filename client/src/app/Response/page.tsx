"use client";

import "../../styles/design.css";
import React from "react";
import Response from "@/components/Response";
import ReportPage from "@/components/Response";

function Page() {
  return (
    <div className="w-full min-h-screen  px-2 sm:px-4 lg:px-0 blue-color flex justify-center items-center">

      {/* <Response></Response> */}
      <ReportPage></ReportPage>
    </div>
  );
}

export default Page;
