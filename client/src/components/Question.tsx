"use client";

import React, { useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import questions from "@/lib/questions";
import GroupQuestionTab from "./GroupQuestionTab";
import QuestionCard from "./Gpt";

function Question() {
  const [currentQuestion, setCurrentQuestion] = useState<string>("q1");
  const [finalAnswer, setFinalAnswer] = useState<any>([]);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState([]);
  const [nextQuestion, setNextQuestion] = useState<string>();
  const [groupCurrentSelectedAnswer, setGroupCurrentSelectedAnswer] =
    useState<any>([]);

  const nextHandler = () => {
    if (!nextQuestion) return;

    setCurrentQuestion(nextQuestion);
    setFinalAnswer((prev: any) => [...prev, currentSelectedAnswer]);
  };

  const handleDataFromChild = (ans: any, nextQues: any) => {
  if (nextQues === "q6") {
    // merge grouped answers
    setGroupCurrentSelectedAnswer((prev: any) => ({
      ...prev,
      ...ans,
    }));
  } else {
    setCurrentSelectedAnswer(ans);
  }

  if (nextQues) setNextQuestion(nextQues);
};


  const btnHandler = () => {
    // console.log(nextQuestion);
    console.log(groupCurrentSelectedAnswer);
    // console.log(questions[currentQuestion]);
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
        <button onClick={btnHandler} className="text-black text-2xl">
          Ckick me
        </button>
      </div>

      {questions[currentQuestion].type !== "GroupSelection" ? (
        <div className="flex w-[50%] flex-wrap">
          {Object.keys(questions.q5.catogories).map((e, i) => {
            const currentData = questions.q5.catogories[e];
            return (
              <GroupQuestionTab
                key={i}
                question={currentData.question}
                options={currentData.answer}
                index={i}
                dataTransfer={handleDataFromChild}
              ></GroupQuestionTab>
            );
          })}
        </div>
      ) : (
        <QuestionTab
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].answer}
          type={questions[currentQuestion].type}
          dataTransfer={handleDataFromChild}
          next={questions[currentQuestion].next}
        ></QuestionTab>
      )}

      {/* <QuestionTab
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].answer}
        type={questions[currentQuestion].type}
        dataTransfer={handleDataFromChild}
        next={questions[currentQuestion].next}
      ></QuestionTab> */}

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
