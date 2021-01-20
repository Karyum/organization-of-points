import React from "react";

import ShapesInfo from "./ShapesInfo";

import AnswerField from "./AnswerField";
function QuestionField() {
  return (
    <div className="main-question-container">
      <div className="question-section">
        <div className="question-timer">
          <div className="question">
            <svg className="shapes">
              <ShapesInfo />
            </svg>
            <svg className="shapes"></svg>
          </div>
          {/* <div className="timer"></div> */}
        </div>
        <div className="answer-section">
          <button className="navigation">prev</button>
          <AnswerField
            className={["svg-draw-container", "shapes solution"]}
            points={[
              { x: 100, y: 100 },
              { x: 200, y: 100 },
              { x: 200, y: 200 },
            ]}
          />
          {/* <div className="svg-draw-container">
          <svg className="shapes solution"></svg>
          </div> */}
          <button className="navigation">next</button>
        </div>
      </div>
      <div className="question-branches"></div>
    </div>
  );
}

export default QuestionField;
