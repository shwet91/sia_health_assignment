"use client";

import React, { useCallback, useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import questions from "@/lib/questions";
import GroupQuestionTab from "./GroupQuestionTab";
import { conditions } from "@/lib/questions";

function MainPannel() {
  const [currentQuestion, setCurrentQuestion] = useState<string>("q1");
  const [finalAnswer, setFinalAnswer] = useState<any>([]);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState([]);
  const [nextQuestion, setNextQuestion] = useState<string>();
  const [groupCurrentSelectedAnswer, setGroupCurrentSelectedAnswer] =
    useState<any>([]);
  const [choice, setChoice] = useState({});

  const nextHandler = () => {
    if (nextQuestion && nextQuestion !== "choice") {
      setCurrentQuestion(nextQuestion);
    } else if (nextQuestion === "choice") {
      setCurrentQuestion("choice");
    }

    if (nextQuestion === "q6") {
      setFinalAnswer((prev) => [...prev, ...groupCurrentSelectedAnswer]);
    } else {
      setFinalAnswer((prev) => [...prev, currentSelectedAnswer]);
    }
  };

  const handleDataFromChild = (ans: any, nextQues: any) => {
    if (nextQues === "q6" && Object.keys(ans).length !== 0) {
      // merge grouped answers
      setGroupCurrentSelectedAnswer((prev: any[]) => {
        // check if answer for same question exists
        const exists = prev.find((e) => e.question === ans.question);
        if (exists) {
          // replace existing answer
          return prev.map((e) => (e.question === ans.question ? ans : e));
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

  function arraysEqualIgnoringOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // create copies and sort them
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();

    // check every element
    return sorted1.every((val, index) => val === sorted2[index]);
  }

  const checkCondition = useCallback(
    (array) => {
      // collect all matching answers
      const condition1 = finalAnswer.flatMap((e) =>
        e.answer.filter((ans) => array.includes(ans))
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

      {questions[currentQuestion]?.type === "GroupSelection" && (
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
      )}

      {(questions[currentQuestion]?.type === "singleSelection" ||
        questions[currentQuestion]?.type === "multiSelection") && (
        <QuestionTab
          question={questions[currentQuestion]?.question}
          options={questions[currentQuestion]?.answer}
          type={questions[currentQuestion]?.type}
          dataTransfer={handleDataFromChild}
          next={questions[currentQuestion]?.next}
        ></QuestionTab>
      )}

      {choice === "conditionA" && currentQuestion === "choice" && (
        <QuestionTab
          question={questions.q7.question}
          options={questions.q7.answer}
          type={questions.q7.type}
          dataTransfer={handleDataFromChild}
          next={questions.q7.next}
        ></QuestionTab>
      )}

      <button
        onClick={nextHandler}
        className="teal-color absolute bottom-3.5 right-[300px] w-[200px] h-[50px] rounded-2xl teal-background text-2xl"
      >
        Next
      </button>
    </div>
  );
}

export default MainPannel;
