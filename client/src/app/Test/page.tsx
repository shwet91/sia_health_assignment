import React from "react";
// import questions from "@/lib/questions";
import Navbar from "@/components/Navbar";
import Question from "@/components/Question";
import PersonalDetails from "@/components/PersonalDetails";

function Page() {
  // Take the basic details
  // Ask the question
  // Display the result
  // simulate sending summary on watsapp

  return (
    <div className="w-full h-screen ">
      <Navbar></Navbar>
      <div className="w-full h-full flex justify-center items-center bg-orange-200">
        <Question></Question>
      </div>
    </div>
  );
}

export default Page;
