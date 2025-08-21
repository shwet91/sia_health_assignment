"use client";

import React, { useEffect, useState } from "react";

function Question({
  question = "this is your question",
  options = [
    "option 1",
    "option 2",
    "option 3",
    "option 4",
    "option 6",
    "option 7",
    "option 8",
    "option 9",
  ],
  type = "multipleSelection",
}: {
  question: string;
  options: string[];
  type: string;
}) {
  const [input, setInput] = useState();
  const [selectedOptions, setSelectedOptins] = useState<number[]>([]);

  const btnHandler = (index: number, value: string) => {
    if (type === "singleSelection") {
      selectedOptions.includes(index)
        ? setSelectedOptins([])
        : setSelectedOptins([index]);
    } else if (type === "multipleSelection") {
      selectedOptions.includes(index)
        ? setSelectedOptins((prev) => prev.filter((i) => i !== index))
        : setSelectedOptins((prev) => [...prev, index]);
    }
  };

  return (
    <div className=" w-full m-4 rounded-lg  flex flex-col">
      <div className="flex justify-between p-4 bg-gray-800">
        <button className="underline  text-2xl">Previous</button>
        <button className="underline  text-2xl">Exit</button>
      </div>
      <div className="bg-white h-[100px] flex justify-center items-center">
        <h1 className="text-black text-2xl">{question}</h1>
      </div>
      <div className="bg-gray-500 flex-1 justify-between items-center flex-col flex thisOne">
        <div className="w-[90%] flex flex-col mt-4 mb-10 h-[75%]">
          {options.length > 0
            ? options.map((e, i) => (
                <button
                  className={` px-6 py-2 rounded-md mb-2  text-2xl ${
                    selectedOptions.includes(i)
                      ? "bg-blue-500 text-white"
                      : "bg-green-400"
                  }`}
                  key={i}
                  onClick={() => btnHandler(i, e)}
                >
                  {e}
                </button>
              ))
            : null}
        </div>

        <button
          className={`px-6 py-2 bg-red-400 w-[90%] mb-4 text-4xl rounded-2xl`}
        >
          {" "}
          Next
        </button>
      </div>
    </div>
  );
}

export default Question;
