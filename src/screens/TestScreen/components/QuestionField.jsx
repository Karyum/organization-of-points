import React from "react";

function QuestionField() {
  return (
    <div className="main-question-container">
      <div className="question-section">
        <div className="question-timer">
          <div className="question">
            <svg className="shapes"></svg>
            <svg className="shapes"></svg>
          </div>
          <div className="timer"></div>
        </div>
        <div className="answer-section"></div>
      </div>
      <div className="question-branches"></div>
    </div>
  );
}

export default QuestionField;
