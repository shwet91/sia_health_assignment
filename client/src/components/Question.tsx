"use client";

import React, { useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import questions from "@/lib/questions";

function Question() {
  const nextHandler = () => {

  };
  return (
    <div className=" w-full m-4 rounded-4xl p-4 bg-white relative flex flex-col">
      <div className="flex justify-between p-8 ">
        <div className="dark-blue-color">HealthCare</div>
        <div>
          <ul className="flex">
            <li className="dark-blue-color ml-5 ">Home</li>
            <li className="dark-blue-color ml-5">About</li>
            <li className="dark-blue-color ml-5">Contact</li>
          </ul>
        </div>
      </div>

      <div className=" w-[50%] ml-8">
        <h1 className="dark-blue-color text-6xl">Take a Health Quiz</h1>
        <p className="dark-blue-color text-sm ml-3 mt-5">
          Amswer a few questions to check your mental health status
        </p>
      </div>

      <QuestionTab question={questions.q1.question} options={questions.q1.answer} type={questions.q1.type}></QuestionTab>

      <button
        onClick={nextHandler}
        className="teal-color absolute bottom-3.5 right-[300px] w-[200px] h-[50px] rounded-2xl teal-background text-2xl"
      >
        Next
      </button>
    </div>
  );
}

export default Question;
