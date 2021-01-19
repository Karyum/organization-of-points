import React from "react";

import ShapesInfo from "./ShapesInfo";

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
          <svg className="shapes solution"></svg>
          <button className="navigation">next</button>
        </div>
      </div>
      <div className="question-branches"></div>
    </div>
  );
}

export default QuestionField;
