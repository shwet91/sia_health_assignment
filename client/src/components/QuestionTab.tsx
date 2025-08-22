import React, { useEffect, useState } from "react";
import { Circle, CircleDot, CheckCircle } from "lucide-react";
import "../styles/design.css";

function QuestionTab({
  question = "this is your question",
  options = {
    "option 1": "q1",
    "option 2": "q1",
    "option 3": "q1",
    "option 4": "q1",
    "option 6": "q1",
    "option 7": "q1",
    "option 8": "q1",
    "option 9": "q1",
  },
  type = "singleSelection",
  next,
}: {
  question: string;
  options: Options;
  type: string;
  next ?: string;
}) {
  const [input, setInput] = useState();
  const [selectedOptions, setSelectedOptins] = useState<number[]>([]);
  const [answer, setAnswer] = useState<answer>({});
  const [nextQuestion, setNextQuestion] = useState<string>();
  const answerArray = Object.keys(options);

  const btnHandler = (index: number, value: string) => {
    if (type === "singleSelection") {
      if (selectedOptions.includes(index)) {
        setSelectedOptins([]);
        setAnswer({});
      } else {
        setSelectedOptins([index]);
        setAnswer({
          [question]: [value],
        });
      }
    } else if (type === "multiSelection") {
      if (selectedOptions.includes(index)) {
        setSelectedOptins((prev) => prev.filter((i) => i !== index));
        setAnswer((prev: any) => ({
          ...prev,
          [question]: prev[question]?.filter((i: string) => i !== value) || [],
        }));
      } else {
        setSelectedOptins((prev) => [...prev, index]);
        setAnswer((prev: any) => ({
          ...prev,
          [question]: [...(prev[question] || []), value],
        }));
      }
    }
  };

  useEffect(() => {
    if (answer.question?.length === 0) return;

    let curentNextValue: null | string = null;
    answer.question?.forEach((e: string) => {
      if (curentNextValue === null) {
        if (options[e] === "" && next) {
          curentNextValue = next;
        } else {
          curentNextValue = options[e];
        }
      }
    });

    if (curentNextValue) {
       setNextQuestion(curentNextValue);
    }
  }, [answer]);
  return (
    <div className=" w-[50%] 1h-[300px] ml-8 mt-5">
      <h1 className="dark-blue-color text-2xl">{question}</h1>
      <div className="  h-[90%] ">
        {answerArray.length > 0
          ? answerArray.map((e, i) => (
              <div
                onClick={() => btnHandler(i, e)}
                key={i}
                className=" mt-2 items-center flex  "
              >
                <div
                  className={`w-6 mr-3 h-6 border-2 rounded-full ${
                    selectedOptions.includes(i) ? "selected" : "teal-color"
                  }`}
                ></div>
                <h1 className="dark-blue-color text-lg select-none">{e}</h1>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default QuestionTab;
