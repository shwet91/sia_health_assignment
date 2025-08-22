import React from "react";
// import questions from "@/lib/questions";
import Navbar from "@/components/Navbar";
import Question from "@/components/Question";
import PersonalDetails from "@/components/PersonalDetails";
import "../../styles/design.css"

function Page() {
  // Take the basic details
  // Ask the question
  // Display the result
  // simulate sending summary on watsapp

  return (
    <div className="w-full h-screen blue-color flex justify-center items-center">
      {/* <Navbar></Navbar> */}
      <div className="w-[75%] h-full flex-col p-5 flex justify-center items-center">
        <Question></Question>
        {/* <button
          className={`px-6 py-2 bg-red-400 w-[90%] mb-4 text-4xl rounded-2xl`}
        >
          Next
        </button> */}
      </div>
    </div>
  );
}

export default Page;
