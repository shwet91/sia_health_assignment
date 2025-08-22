"use client";

import React, { useState } from "react";

type QuestionCardProps = {
  question: string;
  options: string[];
  onNext: (answer: string | null) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onNext,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Question */}
      <p className="text-lg font-medium mb-4">{question}</p>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition ${
              selected === opt
                ? "bg-teal-50 border-teal-400"
                : "hover:bg-blue-50 border-gray-200"
            }`}
          >
            <input
              type="radio"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="h-4 w-4 text-teal-500 focus:ring-teal-400"
            />
            <span className="text-gray-700">{opt}</span>
          </label>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onNext(selected)}
          disabled={!selected}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white rounded-xl shadow-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
