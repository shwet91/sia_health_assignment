// "use client";

// import React, { useState } from "react";

// function PersonalDetails() {
//   const [input, setInput] = useState<string | "male" | "femail">("");
//   const [currentNumber, setCurrentNumber] = useState(0);
//   const [question, setQuestion] = useState<string | null>("Enter your name");
//   const [userData, setUserData] = useState<UserData>({
//     name: null,
//     email: null,
//     number: null,
//     age: null,
//     gender: null,
//   });

//   const btnHandler = () => {
//     if (currentNumber === 0) {
//       setUserData((prev) => ({ ...prev, name: input }));
//       setQuestion("Enter your email");
//       setInput("");
//     } else if (currentNumber === 1) {
//       setUserData((prev) => ({ ...prev, email: input }));
//       setQuestion("Enter your Phone Number");
//       setInput("");
//     } else if (currentNumber === 2) {
//       setUserData((prev) => ({ ...prev, number: input }));
//       setQuestion("Enter your Phone Number");
//       setInput("");
//     } else if (currentNumber === 3) {
//       setUserData((prev) => ({ ...prev, age: input }));
//       setQuestion("Enter your Gender");
//       setInput("");
//     } else if (
//       currentNumber === 4 &&
//       (input === "male" || input === "femail")
//     ) {
//       setUserData((prev : any) => ({ ...prev, gender: input }));
//       setInput("");
//       setQuestion(null);
//       console.log(userData);
//     }
//     setCurrentNumber((prev) => prev + 1);
//   };
//   return (
//     <div>
//       <h1 className="text-gray-800">{question}</h1>
//       <input
//         type="text"
//         onChange={(e) => setInput(e.target.value)}
//         value={input}
//         className="w-full max-w-md px-4 py-2 text-black bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
//       />

//       <button className="px-6 py-3 bg-blue-500" onClick={btnHandler}>
//         Next
//       </button>
//     </div>
//   );
// }

// export default PersonalDetails;
