import React, { useEffect, useState } from "react";
import "../styles/design.css";

interface UserDetails {
  name: string;
  email: string;
  phoneNo: string;
  age: string;
  gender: string;
}

const details: UserDetails = {
  name: "",
  email: "",
  phoneNo: "",
  age: "",
  gender: "",
};

import { motion, AnimatePresence, Variants } from "framer-motion";
import "../styles/design.css";

function PersonalDetails({ dataTransfer = () => {} }: { dataTransfer?: any }) {
  const [nextQuestion, setNextQuestion] = useState<string | null>(null);
  const [details, setDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phoneNo: "",
    age: "",
    gender: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const keys = Object.keys(details) as (keyof UserDetails)[];

  // Field configurations for better UX
  const fieldConfig = {
    name: { placeholder: "Enter your full name", type: "text", label: "Name" },
    email: {
      placeholder: "Enter your email address",
      type: "email",
      label: "Email",
    },
    phoneNo: {
      placeholder: "Enter your phone number",
      type: "tel",
      label: "Phone Number",
    },
    age: { placeholder: "Enter your age", type: "number", label: "Age" },
    gender: { placeholder: "", type: "select", label: "Gender" },
  };

  const btnHandler = () => {
    if (currentIndex < keys.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // ✅ finished collecting all details
      dataTransfer(details, "q1");
    }
  };

  const inputHandler = (key: keyof UserDetails, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getCurrentField = () => keys[currentIndex];
  const currentFieldConfig = fieldConfig[getCurrentField()];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const questionVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.3 },
    },
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.2 },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const progressVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: `${((currentIndex + 1) / keys.length) * 100}%`,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // useEffect(() => {
  // if (currentIndex > 4 ) {
  //   dataTransfer()
  // }
  // } , [currentIndex])

  return (
    <motion.div
      className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-2xl h-auto min-h-[400px] px-4 sm:px-6 lg:px-8 mt-3 sm:mt-5 1border-4 border-amber-500"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6 sm:mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
          variants={progressVariants}
          initial="hidden"
          animate="visible"
        />
      </div>

      {/* Step Counter */}
      <motion.div
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-sm sm:text-base text-gray-500 font-medium">
          Step {currentIndex + 1} of {keys.length}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="dark-blue-color text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-center mb-2 sm:mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let's get to know you better
      </motion.h1>

      {/* Dynamic Question */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          className="dark-blue-color text-lg sm:text-xl lg:text-2xl font-semibold leading-tight text-center mb-8 sm:mb-12"
          variants={questionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          What's your {currentFieldConfig.label.toLowerCase()}?
        </motion.h2>
      </AnimatePresence>

      {/* Input Container */}
      <motion.div
        className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100 mb-8 sm:mb-10"
        variants={inputVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {/* Text Input Fields */}
          {currentIndex < 4 && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                {currentFieldConfig.label}
              </label>
              <input
                type={currentFieldConfig.type}
                placeholder={currentFieldConfig.placeholder}
                className="w-full text-gray-800 text-base sm:text-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 outline-none bg-white shadow-sm hover:border-gray-300 focus:shadow-md"
                autoComplete="off"
                value={details[getCurrentField()]}
                onChange={(e) =>
                  inputHandler(getCurrentField(), e.target.value)
                }
              />
            </motion.div>
          )}

          {/* Gender Selection */}
          {currentIndex === 4 && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-4 text-center">
                Select your gender
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <motion.button
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md ${
                    details.gender === "male"
                      ? "bg-teal-600 text-white ring-4 ring-teal-200"
                      : "bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                  }`}
                  type="button"
                  onClick={() => inputHandler("gender", "male")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  👨 Male
                </motion.button>
                <motion.button
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md ${
                    details.gender === "female"
                      ? "bg-teal-600 text-white ring-4 ring-teal-200"
                      : "bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                  }`}
                  type="button"
                  onClick={() => inputHandler("gender", "female")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  👩 Female
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        {/* Back Button */}
        {currentIndex > 0 && (
          <motion.button
            type="button"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 shadow-md"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            ← Back
          </motion.button>
        )}

        {/* Next/Submit Button */}
        <motion.button
          type="button"
          className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={btnHandler}
          disabled={!details[getCurrentField()]}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {currentIndex === keys.length - 1
            ? "Complete Setup ✨"
            : "Continue →"}
        </motion.button>
      </div>

      {/* Encouraging Text */}
      <motion.p
        className="text-center text-gray-500 text-sm sm:text-base mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Your information is secure and will be used to personalize your
        experience
      </motion.p>
    </motion.div>
  );
}

export default PersonalDetails;
