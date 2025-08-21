import React from "react";

function FirstVisit() {
  return (
    <div className=" flex flex-col p-5  w-5/6 h-1/2 rounded-lg bg-orange-100">
      <h1 className="text-gray-700 text-center text-4xl mb-6">Hey There !</h1>
      <p className="text-black text-center text-lg">You have takken the tria Test before</p>

      <button className=" m-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm md:text-base">
        Start from Beginning
      </button>
      <button className=" m-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm md:text-base">
        Continue where I left
      </button>
    </div>
  );
}

export default FirstVisit;
