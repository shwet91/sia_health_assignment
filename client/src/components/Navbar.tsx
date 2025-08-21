import React from "react";

function Navbar() {
  return (
    <div className="w-full justify-between flex p-2  bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      {/* logo  */}
      <div className="w-14 h-14 ">
        <img
          src="https://i.pinimg.com/736x/bc/6e/cf/bc6ecf1c19ff164f32cc883a0ff54465.jpg"
          alt="LOGO"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/*  options  */}
      <div className=" bg-blue-200 rounded-lg flex justify-center items-center w-2/3 md:w-1/4 ">
        <h1 className="text-gray-800 ">Take Test</h1>
      </div>
    </div>
  );
}

export default Navbar;
