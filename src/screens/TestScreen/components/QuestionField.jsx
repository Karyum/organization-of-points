import React, { useState } from "react";
import { lines, points } from "../../../utils/consts";
import { Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ExamSteps from "../../../components/ExamSteps";
import shapes from "../../../data/data.json";
import ShapesInfo from "./ShapesInfo";
import { adjustShapeToBoard ,getShapePoints} from "../../../utils/boardUtils";
import AnswerField from "./AnswerField";

const currentShape = shapes[4];


function QuestionField() {

  const [count, setCount] = useState(0);
  const [done, setDone] = useState([]);

  const currentShape = shapes[count];
  

  const isDone = (qq) => done.find(q=> q===q);

  const nextShape = () => {
    if(count + 1 === shapes.length){
      setCount(0);
    } 
    
    if(isFinish) {
    
      setCount(count + 1);
    }
  }

  const prevShape = () => {
    if(count - 1 === -1){
      setCount(0);
    } else {
      setCount(count - 1);
    }
  }




  return (
    <div className="main-question-container">
      <ExamSteps />
      <div className="question-section">
        <div className="question-timer">
          <div className="question">
              <ShapesInfo shape={currentShape}/>
            <svg className="shapes"></svg>
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
            shape={
              currentShape
            }
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
