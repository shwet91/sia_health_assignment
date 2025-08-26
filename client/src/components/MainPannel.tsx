"use client";

import React, { useCallback, useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import questions from "@/lib/questions";
import GroupQuestionTab from "./GroupQuestionTab";
import { conditions } from "@/lib/questions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PersonalDetails from "./PersonalDetail";
import { Loader2 } from "lucide-react";
import { reportConditions } from "@/lib/questions";

type DataTransferFunction = (
  ReportMessage: string,
  activateReport: boolean
) => void;

type MainPannelProps = {
  dataTransferFunction: DataTransferFunction;
};

export function InlineLoader() {
  return <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />;
}

function ImageBox() {
  return (
    <div className="w-48 h-48 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 overflow-hidden rounded-xl sm:rounded-2xl relative">
      <Image
        src="/girl.jpg" // put your image inside /public
        alt="sample"
        fill
        className="object-cover "
      />
    </div>
  );
}

function Logo() {
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 overflow-hidden rounded-lg sm:rounded-xl relative mr-2 sm:mr-3">
      <Image
        src="/logo.jpg" // put your image inside /public
        alt="sample"
        fill
        className="object-cover"
      />
    </div>
  );
}

function MainPannel({ dataTransferFunction }: MainPannelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>("details");
  // I am changing currentQuestion from q1 to details
  const [finalAnswer, setFinalAnswer] = useState<any>([]);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<any>([]);
  const [nextQuestion, setNextQuestion] = useState<any>();
  const [groupCurrentSelectedAnswer, setGroupCurrentSelectedAnswer] =
    useState<any>([]);
  const [choice, setChoice] = useState<any>("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newArrOfAns = finalAnswer.flatMap((e: any) => e.answer);
    let isReportDesired = true;
    const condition = createReport();

    if (
      newArrOfAns.includes("Maybe later") ||
      newArrOfAns.includes("No thanks")
    ) {
      isReportDesired = false;
       dataTransferFunction(condition, isReportDesired);
    } else if (
      newArrOfAns.includes("Yes, WhatsApp me") ||
      newArrOfAns.includes("Yes, book a free call")
    ) {
      dataTransferFunction(condition, isReportDesired);
    }

    // setFinalAnswer([]);
    // setUserDetails(null);
    // setIsLoading(false);
  }, [finalAnswer]);

  const createReport = () => {
    let condition = "empty";
    const arrOfAns = finalAnswer.flatMap((e: any) => e.answer);

    const noOfRedFlags = arrOfAns.filter((ans: string) =>
      reportConditions.redFlag.includes(ans)
    ).length;

    const noOfMildSymptioms = arrOfAns.filter((ans: string) =>
      reportConditions.mildSymptom.includes(ans)
    ).length;

    const harmonalIssues = arrOfAns.filter((ans: string) =>
      reportConditions.PregnancyOrHarmonalHistory.includes(ans)
    ).length;

    if (
      noOfRedFlags > 3 &&
      !arrOfAns.includes("I have been diagnosed before and need support") &&
      !arrOfAns.includes("Just curious") &&
      !arrOfAns.includes("I am planning for pregnancy") &&
      !arrOfAns.includes("I am currently pregnant and want to support my body")
    ) {
      condition = "this is condition A";
    } else if (
      arrOfAns.includes("I have been diagnosed before and need support")
    ) {
      condition = "this is condition B";
    } else if (
      (arrOfAns.includes("I am planning for pregnancy") ||
        arrOfAns.includes(
          "I am currently pregnant and want to support my body"
        )) &&
      harmonalIssues > 0
    ) {
      condition = "this is condition C";
    } else if (arrOfAns.includes("Just curious") && noOfMildSymptioms > 0) {
      condition = "this is condition D";
    }

    return condition;
  };

  const btnDebug = () => {
    console.log(finalAnswer);
    createReport();
  };

  const nextHandler = async () => {
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

    if (nextQuestion === "end") {
      if (isLoading === true) return;

      try {
        setIsLoading(true);
        setCurrentQuestion("q10");
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userDetails?.name,
            email: userDetails?.email,
            phoneNo: userDetails?.phoneNo,
            age: userDetails?.age,
            gender: userDetails?.gender,
            answers: finalAnswer,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message || `Failed with status ${response.status}`
          );
        }

        // router.push("/Response");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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

    if (currentQuestion === "details") {
      setCurrentQuestion(nextQues);
      setUserDetails(ans);
    }

    if (nextQues) setNextQuestion(nextQues);
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
        e?.answer.filter((ans: any) => array.includes(ans))
      );

      const isEqual = arraysEqualIgnoringOrder(condition1, array);
      return isEqual;
    },
    [finalAnswer]
  );

  useEffect(() => {
    if (nextQuestion === "choice" && choice === "") {
      setNextQuestion("q10");
    }
  }, [nextQuestion, choice]);

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
    <div
      className={` ${
        (questions as any)[currentQuestion]?.type === "GroupSelection"
          ? "min-h-[1650px]"
          : "min-h-[920px]"
      } w-full m-2 sm:m-4 rounded-xl sm:rounded-2xl lg:rounded-4xl p-2 sm:p-4 bg-white relative flex flex-col  md:min-h-[500px] sm:min-h-[900px] lg:min-h-[800px]`}
    >
      {/* CHANGED: Improved header layout for logo and navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-4 sm:p-6 lg:p-8 relative z-10">
        {/* CHANGED: Enhanced logo section with better alignment and responsive text */}
        <div className="dark-blue-color text-lg sm:text-xl mb-4 sm:mb-0 flex items-center">
          <Logo />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            HealthCare
          </h1>
          <button onClick={btnDebug}>Debug</button>
        </div>
        <div>
          <ul className="flex flex-wrap justify-center sm:justify-end">
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base hover:opacity-75 cursor-pointer transition-opacity">
              Home
            </li>
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base hover:opacity-75 cursor-pointer transition-opacity">
              About
            </li>
            <li className="dark-blue-color ml-2 sm:ml-3 lg:ml-5 text-sm sm:text-base hover:opacity-75 cursor-pointer transition-opacity">
              Contact
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full sm:w-[90%] lg:w-[60%] xl:w-[50%] ml-4 sm:ml-6 lg:ml-8 px-2 sm:px-0 relative z-10 ">
        <h1 className="dark-blue-color text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight ">
          Take a Health Quiz
        </h1>
        <p className="dark-blue-color text-xs sm:text-sm 1ml-1 sm:ml-0 mt-3 sm:mt-5 max-w-md">
          Answer a few questions to check your health status. We keep All your
          data in secured form.
        </p>
      </div>

      {/* CHANGED: Adjusted questions layout to work with image positioning */}
      {(questions as any)[currentQuestion]?.type === "GroupSelection" && (
        <div className="flex w-full lg:w-[90%] xl:w-[60%] flex-wrap px-4 sm:px-0 relative z-10">
          {Object.keys((questions as any).q5.catogories).map(
            (e: any, i: any) => {
              const currentData = (questions as any).q5.catogories[e];
              return (
                <GroupQuestionTab
                  key={i}
                  question={currentData.question}
                  options={currentData.answer}
                  index={i}
                  dataTransfer={handleDataFromChild}
                />
              );
            }
          )}
        </div>
      )}

      {((questions as any)[currentQuestion]?.type === "singleSelection" ||
        (questions as any)[currentQuestion]?.type === "multiSelection") && (
        <div className="relative z-10">
          <QuestionTab
            question={(questions as any)[currentQuestion]?.question}
            options={(questions as any)[currentQuestion]?.answer}
            type={(questions as any)[currentQuestion]?.type}
            dataTransfer={handleDataFromChild}
            next={(questions as any)[currentQuestion]?.next}
          />
        </div>
      )}

      {choice === "conditionA" && currentQuestion === "choice" && (
        <div className="relative z-10">
          <QuestionTab
            question={(questions as any).q7.question}
            options={(questions as any).q7.answer}
            type={(questions as any).q7.type}
            dataTransfer={handleDataFromChild}
            next={(questions as any).q7.next}
          />
        </div>
      )}

      {choice === "conditionB" && currentQuestion === "choice" && (
        <div className="relative z-10">
          <QuestionTab
            question={(questions as any).q8.question}
            options={(questions as any).q8.answer}
            type={(questions as any).q8.type}
            dataTransfer={handleDataFromChild}
            next={(questions as any).q8.next}
          />
        </div>
      )}

      {choice === "conditionC" && currentQuestion === "choice" && (
        <div className="relative z-10">
          <QuestionTab
            question={(questions as any).q9.question}
            options={(questions as any).q9.answer}
            type={(questions as any).q9.type}
            dataTransfer={handleDataFromChild}
            next={(questions as any).q9.next}
          />
        </div>
      )}

      {currentQuestion === "details" && (
        <div className="relative z-10">
          <PersonalDetails dataTransfer={handleDataFromChild}></PersonalDetails>
        </div>
      )}

      {/* CHANGED: Made image positioning fully responsive - hidden on mobile, positioned differently on larger screens */}
      <div className="hidden1 sm:block absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 xl:bottom-12 xl:right-12">
        <ImageBox />
      </div>

      {/* CHANGED: Adjusted button positioning to avoid overlap with image and made it more responsive */}
      <button
        onClick={nextHandler}
        className={` ${currentQuestion === "details" ? "hidden" : ""}
          flex justify-center items-center gap-3 teal-color-1 absolute bottom-3 sm:bottom-6 left-4 sm:left-8 md:left-auto md:right-4 lg:right-8 xl:right-[420px] w-[120px] sm:w-[160px] lg:w-[200px] h-[40px] sm:h-[45px] lg:h-[50px] rounded-xl sm:rounded-2xl teal-background text-lg sm:text-xl lg:text-2xl z-20 shadow-lg hover:shadow-2xl transition-shadow`}
      >
        {nextQuestion === "end" ? <h1>Submit</h1> : <h1>Next</h1>}
        {isLoading ? <InlineLoader></InlineLoader> : null}
      </button>
    </div>
  );
}

export default MainPannel;
