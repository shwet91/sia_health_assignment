import React, { useEffect, useState } from "react";
import { Circle, CircleDot, CheckCircle } from "lucide-react";
import "../styles/design.css";

function GroupQuestionTab({
  question = "this question",
  options = ["option 1", "option 2", "option 3", "option 4", "option 6"],
  next = "q6",
  dataTransfer = () => {},
  index = 4,
}: {
  question?: string;
  options?: any;
  next?: any;
  dataTransfer?: any;
  index?: number;
}) {
  const [selectedOptions, setSelectedOptins] = useState<number[]>([]);
  const [answer, setAnswer] = useState<any>({});

  const func = () => {
    console.log(answer);
  };

  useEffect(() => {
    if (!answer) return;

    dataTransfer(answer, "q6");
  }, [answer]);

  const btnHandler = (index: number, value: string) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptins([]);
      setAnswer({
        question: `${question}`,
        type: "GroupSelection",
        answer: [],
      });
    } else {
      setSelectedOptins([index]);
      setAnswer({
        question: `${question}`,
        type: "GroupSelection",
        answer: [value],
      });
    }
  };

  // logic to set next question

  useEffect(() => {
    if (!answer) return;
    if (answer[question]?.length === 0) return;

    let curentNextValue: string[] = [];
    answer[question]?.forEach((e: string) => {
      if (options[e] === "" && next) {
        curentNextValue.push(next);
      } else {
        if (curentNextValue.includes(options[e])) return;
        curentNextValue.push(options[e]);
      }
    });
  }, [answer?.[question]]);

  useEffect(() => {
    setSelectedOptins([]);
  }, [question]);

  return (
    <div
      className={`${
        index === 4
          ? ""
          : "border-b border-gray-300 sm:border-b-2 sm:border-gray-400"
      } w-full sm:w-1/2 mt-3 sm:mt-5 pr-2 sm:mr-0 pb-2 sm:pb-3`}
    >
      <h1 className="dark-blue-color text-lg sm:text-xl leading-tight mb-2">
        {question}
      </h1>
      <button onClick={func} className="text-black text-sm sm:text-base">
        Click me
      </button>
      <div className="h-auto min-h-[120px] mt-2">
        {options.length > 0
          ? options.map((e: any, i: any) => (
              <div
                onClick={() => btnHandler(i, e)}
                key={i}
                className="mt-2 sm:mt-3 items-center flex cursor-pointer p-2 sm:p-1 rounded-lg sm:rounded-none transition-colors duration-200"
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 border-2 rounded-full flex-shrink-0 ${
                    selectedOptions.includes(i) ? "selected" : "teal-color"
                  }`}
                ></div>
                <h1 className="dark-blue-color text-xs sm:text-sm select-none leading-relaxed break-words">
                  {e}
                </h1>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default GroupQuestionTab;
