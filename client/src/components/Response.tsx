import React from "react";

function Response(answer: []) {
  return (
    <div>
      {answer.map((ans : any, index) => {
        return (
          <div key={index}>
            <h1>Questn :{ans.question}</h1>
            <h1>Answe : {ans.answer.map((eachAns : any) => eachAns)}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Response;
