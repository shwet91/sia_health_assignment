import React, { useEffect, useState } from "react";
import { Circle, CircleDot, CheckCircle } from "lucide-react";
import "../styles/design.css";

function GroupQuestionTab({
  question = "this question",
  options = ["option 1", "option 2", "option 3", "option 4", "option 6"],
  next = "q4",
  dataTransfer = () => {},
  index = 4,
}: {
  question?: string;
  options?: any;
  next?: any;
  dataTransfer?: any;
  index?: number;
}) {
  const [input, setInput] = useState();
  const [selectedOptions, setSelectedOptins] = useState<number[]>([]);
  const [answer, setAnswer] = useState<answer | null>();

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
        [question]: [],
      });
    } else {
      setSelectedOptins([index]);
      setAnswer({
        [question]: [value],
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
        index === 4 ? "" : "border-b-2"
      } w-1/2 mt-5 mr border-gray-400 pb-3`}
    >
      <h1 className="dark-blue-color text-xl">{question}</h1>
      <button onClick={func} className="text-black">
        Click me
      </button>
      <div className="  h-[90%] ">
        {options.length > 0
          ? options.map((e, i) => (
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
                <h1 className="dark-blue-color text-sm select-none">{e}</h1>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default GroupQuestionTab;
