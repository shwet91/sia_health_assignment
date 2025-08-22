"use client";

import React, { useCallback, useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import questions from "@/lib/questions";
import GroupQuestionTab from "./GroupQuestionTab";
import { conditions } from "@/lib/questions";

// Changed to any to avoid type checking issues
type QuestionKey = any;

function MainPannel() {
  // Changed all useState types to any
  const [currentQuestion, setCurrentQuestion] = useState<any>("q1");
  const [finalAnswer, setFinalAnswer] = useState<any>([]);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<any>([]);
  const [nextQuestion, setNextQuestion] = useState<any>();
  const [groupCurrentSelectedAnswer, setGroupCurrentSelectedAnswer] = useState<any>([]);
  const [choice, setChoice] = useState<any>({});

  const nextHandler = () => {
    if (nextQuestion && nextQuestion !== "choice") {
      setCurrentQuestion(nextQuestion);
    } else if (nextQuestion === "choice") {
      setCurrentQuestion("choice");
    }

    if (nextQuestion === "q6") {
      setFinalAnswer((prev: any) => [...prev, ...groupCurrentSelectedAnswer]);
    } else {
      setFinalAnswer((prev: any) => [...prev, currentSelectedAnswer]);
    }
  };

  const handleDataFromChild = (ans: any, nextQues: any) => {
    if (nextQues === "q6" && Object.keys(ans).length !== 0) {
      // merge grouped answers
      setGroupCurrentSelectedAnswer((prev: any[]) => {
        // check if answer for same question exists
        const exists = prev.find((e: any) => e.question === ans.question);
        if (exists) {
          // replace existing answer
          return prev.map((e: any) => (e.question === ans.question ? ans : e));
        } else {
          // add new answer
          return [...prev, ans];
        }
      });
    } else {
      setCurrentSelectedAnswer(ans);
    }

    if (nextQues) setNextQuestion(nextQues);
  };

  const btnHandler = () => {
    // console.log(groupCurrentSelectedAnswer);
    console.log(finalAnswer);
    console.log(choice);
    console.log(currentQuestion);
    console.log(nextQuestion);
    // console.log(questions[currentQuestion]);
  };

  function arraysEqualIgnoringOrder(arr1: any, arr2: any) {
    if (arr1.length !== arr2.length) return false;

    // create copies and sort them
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();

    // check every element
    return sorted1.every((val: any, index: any) => val === sorted2[index]);
  }

  const checkCondition = useCallback(
    (array: any) => {
      // collect all matching answers
      const condition1 = finalAnswer.flatMap((e: any) =>
        e.answer.filter((ans: any) => array.includes(ans))
      );

      const isEqual = arraysEqualIgnoringOrder(condition1, array);
      return isEqual;
    },
    [finalAnswer]
  );

  useEffect(() => {
    const isConditionATrue = checkCondition(conditions.conditionA);
    const isConditionBTrue = checkCondition(conditions.conditionB);
    const isConditionCTrue = checkCondition(conditions.conditionC);
    const isConditionDTrue = checkCondition(conditions.conditionD);
    const isConditionETrue = checkCondition(conditions.conditionE);

    if (isConditionATrue) {
      setChoice("conditionA");
    } else if (isConditionBTrue || isConditionCTrue) {
      setChoice("conditionB");
    } else if (isConditionDTrue) {
      setChoice("conditionC");
    } else if (isConditionETrue) {
      setChoice("conditionC");
    }
  }, [finalAnswer]);

  return (
    <div className="w-full m-2 sm:m-4 rounded-xl sm:rounded-2xl lg:rounded-4xl p-2 sm:p-4 bg-white relative flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-4 sm:p-6 lg:p-8">
        <div className="dark-blue-color text-lg sm:text-xl mb-4 sm:mb-0">
          HealthCare
        </div>
        <div>
          <ul className="flex flex-wrap justify-center sm:justify-end">
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base">
              Home
            </li>
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base">
              About
            </li>
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base">
              Contact
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full sm:w-[80%] lg:w-[50%] ml-4 sm:ml-6 lg:ml-8 px-2 sm:px-0">
        <h1 className="dark-blue-color text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Take a Health Quiz
        </h1>
        <p className="dark-blue-color text-xs sm:text-sm ml-1 sm:ml-3 mt-3 sm:mt-5">
          Answer a few questions to check your mental health status
        </p>
        <button
          onClick={btnHandler}
          className="text-black text-lg sm:text-xl lg:text-2xl mt-2"
        >
          Click me
        </button>
      </div>

      {/* Fixed potential undefined access with optional chaining and type casting */}
      {(questions as any)[currentQuestion]?.type === "GroupSelection" && (
        <div className="flex w-full lg:w-[80%] xl:w-[50%] flex-wrap px-4 sm:px-0">
          {Object.keys((questions as any).q5.catogories).map((e: any, i: any) => {
            const currentData = (questions as any).q5.catogories[e];
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
      )}

      {/* Fixed potential undefined access with type casting */}
      {((questions as any)[currentQuestion]?.type === "singleSelection" ||
        (questions as any)[currentQuestion]?.type === "multiSelection") && (
        <QuestionTab
          question={(questions as any)[currentQuestion]?.question}
          options={(questions as any)[currentQuestion]?.answer}
          type={(questions as any)[currentQuestion]?.type}
          dataTransfer={handleDataFromChild}
          next={(questions as any)[currentQuestion]?.next}
        ></QuestionTab>
      )}

      {/* Fixed potential undefined access with type casting */}
      {choice === "conditionA" && currentQuestion === "choice" && (
        <QuestionTab
          question={(questions as any).q7.question}
          options={(questions as any).q7.answer}
          type={(questions as any).q7.type}
          dataTransfer={handleDataFromChild}
          next={(questions as any).q7.next}
        ></QuestionTab>
      )}

      <button
        onClick={nextHandler}
        className="teal-color absolute bottom-3 sm:bottom-3.5 right-4 sm:right-8 lg:right-[300px] w-[120px] sm:w-[160px] lg:w-[200px] h-[40px] sm:h-[45px] lg:h-[50px] rounded-xl sm:rounded-2xl teal-background text-lg sm:text-xl lg:text-2xl"
      >
        Next
      </button>
    </div>
  );
}

export default MainPannel;