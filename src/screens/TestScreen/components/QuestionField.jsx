import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExamSteps from "../../../components/ExamSteps";
import questions from '../../../data/Questions.json'
import AnswerField from "./AnswerField";
import QuestionInfo from "./QuestionInfo";
const QIndex = 0;
const questionBranches = questions[QIndex].branches;

function QuestionField() {

  const [count, setCount] = useState(0);

  const [done, setDone] = useState([]);

  const isDone = (qq) => done.find(q => q === q);

  const nextShape = () => {
    if (count + 1 === questions[QIndex].branches.length - 1) {
      setCount(0);
    }

    if (done.length >= 0) {
      setCount((prev) => prev + 1);
    }
  }

  const prevShape = () => {
    if (count - 1 === -1) {
      setCount(0);
    } else {
      setCount((prev) => prev - 1);
    }
  }


  return (
    <div className="main-question-container">
      <ExamSteps />
      <div className="question-section">
        <div className="question-timer">
          <div className="question">
            <QuestionInfo question={questions[QIndex].question} infoType='line' />
            <QuestionInfo question={questions[QIndex].question} />
          </div>
        </div>
        <div className="answer-section">
          <IconButton
            aria-label="previous"
            style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
            onClick={prevShape}
          >
            <ChevronLeftIcon style={{ fontSize: 40 }} />
          </IconButton>
          <AnswerField
            className={["svg-draw-container", "shapes solution"]}
            branch={questionBranches[count]}

          />

          <IconButton
            aria-label="next"
            style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
            onClick={nextShape}
          >
            <ChevronRightIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default QuestionField;
