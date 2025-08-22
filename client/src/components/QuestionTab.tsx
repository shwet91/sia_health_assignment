import React, { useEffect, useState } from "react";
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
  next = "q4",
  dataTransfer = () => {},
}: {
  question: string;
  options: any;
  type: any;
  next?: any;
  dataTransfer: any;
}) {
  const [input, setInput] = useState();
  const [selectedOptions, setSelectedOptins] = useState<number[]>([]);
  const [answer, setAnswer] = useState<AnswerType | null>(null);

  const [nextQuestion, setNextQuestion] = useState<string | null>(null);
  const answerArray = Object.keys(options);

  const func = () => {
    console.log(nextQuestion);
  };

  useEffect(() => {
    dataTransfer(answer, nextQuestion);
  }, [answer, nextQuestion]);

  const btnHandler = (index: number, value: string) => {
    if (type === "singleSelection") {
      if (selectedOptions.includes(index)) {
        setSelectedOptins([]);
        setAnswer(null);
      } else {
        setSelectedOptins([index]);
        setAnswer({
          question,
          type: "singleSelection",
          answer: [value],
        });
      }
    } else if (type === "multiSelection") {
      if (selectedOptions.includes(index)) {
        // remove from selection
        setSelectedOptins((prev) => prev.filter((i) => i !== index));
        setAnswer((prev: any) => ({
          ...prev,
          question,
          type: "multiSelection",
          answer: prev.answer?.filter((i: string) => i !== value) || [],
        }));
      } else {
        // add to selection
        setSelectedOptins((prev) => [...prev, index]);
        setAnswer((prev: any) => ({
          ...prev,
          question,
          type: "multiSelection",
          answer: [...(prev?.answer || []), value],
        }));
      }
    }
  };

  // logic to set next question

  useEffect(() => {
    if(!answer) return;

    if (answer.answer?.length === 0) return;

    let curentNextValue: string[] = [];
    answer.answer?.forEach((e: string) => {
      if (options[e] === "" && next) {
        curentNextValue.push(next);
      } else {
        if (curentNextValue.includes(options[e])) return;
        curentNextValue.push(options[e]);
      }
    });
    if (curentNextValue.length === 1) {
      setNextQuestion(curentNextValue[0]);
    } else {
      setNextQuestion(next);
    }
  }, [answer?.answer?.join(","), next, options]);

  useEffect(() => {
    setSelectedOptins([]);
    setAnswer(null);
  }, [question]);

  useEffect(() => {
    if (selectedOptions.length === 0) setNextQuestion(null);
  }, [selectedOptions]);

  return (
    <div className="w-full sm:w-[80%] lg:w-[50%] h-auto min-h-[200px] ml-4 sm:ml-6 lg:ml-8 mt-3 sm:mt-5 px-2 sm:px-0">
      <h1 className="dark-blue-color text-lg sm:text-xl lg:text-2xl leading-tight">
        {question}
      </h1>
      <button onClick={func} className="text-black text-sm sm:text-base">
        Click me
      </button>
      <div className="h-auto min-h-[150px] mt-2 sm:mt-4">
        {answerArray.length > 0
          ? answerArray.map((e, i) => (
              <div
                onClick={() => btnHandler(i, e)}
                key={i}
                className="mt-2 sm:mt-3 items-center flex cursor-pointer p-2 sm:p-1 hover:bg-gray-50 rounded-lg sm:rounded-none transition-colors duration-200"
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 border-2 rounded-full flex-shrink-0 ${
                    selectedOptions.includes(i) ? "selected" : "teal-color"
                  }`}
                ></div>
                <h1 className="dark-blue-color text-sm sm:text-base lg:text-lg select-none leading-relaxed break-words">
                  {e}
                </h1>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default QuestionTab;
