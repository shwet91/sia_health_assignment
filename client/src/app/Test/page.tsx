import React from "react";
// import questions from "@/lib/questions";
import Navbar from "@/components/Navbar";
import PersonalDetails from "@/components/PersonalDetails";
import "../../styles/design.css";
import MainPannel from "@/components/MainPannel";

function Page() {
  // Take the basic details
  // Ask the question
  // Display the result
  // simulate sending summary on watsapp

  return (
    <div className="w-full h-screen blue-color flex justify-center items-center">
      {/* <Navbar></Navbar> */}
      <div className="w-[75%] h-full flex-col p-5 flex justify-center items-center">
        <MainPannel></MainPannel>
      </div>
    </div>
  );
}

export default Page;
