import React from "react";
// import questions from "@/lib/questions";
import Navbar from "@/components/Navbar";
// import PersonalDetails from "@/components/PersonalDetails";
import "../../styles/design.css";
import MainPannel from "@/components/MainPannel";

function Page() {
  // Take the basic details
  // Ask the question
  // Display the result
  // simulate sending summary on WhatsApp

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 lg:px-0 blue-color flex justify-center items-center">
      {/* <Navbar></Navbar> */}
      <div className="w-full sm:w-[90%] lg:w-[80%] h-full flex-col p-2 sm:p-5 flex justify-center items-center">
        <MainPannel />
      </div>
    </div>
  );
}

export default Page;

