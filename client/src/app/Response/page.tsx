"use client"



import { useAppSelector } from "@/store/store";
import React from "react";

function Page(answer: []) {
  const userData = useAppSelector((state) => state.user.userData);
  const userResponse = useAppSelector((state) => state.user.userResponse);

  const btnHandler = () => {
    console.log(userData);
    console.log(userResponse);
  };
  return (
    <div>
      <h1>Your response is</h1>
      <button onClick={btnHandler}>click me</button>
    </div>
  );
}

export default Page;
