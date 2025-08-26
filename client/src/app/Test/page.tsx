"use client";

import React, { useEffect, useState } from "react";
// import questions from "@/lib/questions";
import Navbar from "@/components/Navbar";
// import PersonalDetails from "@/components/PersonalDetails";
import "../../styles/design.css";
import MainPannel from "@/components/MainPannel";
// import Response from "../../components/Response"
import ReportPage from "@/components/Response";

function Page() {
  const [isReportActive, setIsReportActive] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [isReportPageActive, setIsReportPageActive] = useState(false);

  const getDataFromChild = (ReportMessage: string, activateReport: boolean) => {
    setIsReportActive(activateReport);
    setDisplayMessage(ReportMessage);
    setIsReportPageActive(true);
  };

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 lg:px-0 blue-color flex justify-center items-center">
      {/* <Navbar></Navbar> */}
      <div className="w-full sm:w-[90%] lg:w-[80%] h-full flex-col p-2 sm:p-5 flex justify-center items-center">
        {isReportPageActive ? (
          <ReportPage
            showMessage={isReportActive}
            displayMessage={displayMessage}
          ></ReportPage>
        ) : (
          <MainPannel dataTransferFunction={getDataFromChild} />
        )}
        {/* <MainPannel dataTransferFunction={getDataFromChild} />
        <ReportPage></ReportPage> */}
      </div>
    </div>
  );
}

export default Page;
