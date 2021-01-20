import React from "react";
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

const currentShape = adjustShapeToBoard(shapes[4], 240);
const currentShapePoints = getShapePoints(currentShape)

function QuestionField() {
  return (
    <div className="main-question-container">
      <ExamSteps />
      <div className="question-section">
        <div className="question-timer">
          <div className="question">
            <svg className="shapes">
              <ShapesInfo linesArr={lines} />
            </svg>
            <svg className="shapes">
              <ShapesInfo pointsArr={points} />
            </svg>
          </div>
        </div>
        <div className="answer-section">
          <IconButton
            aria-label="previous"
            style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
          >
            <ChevronLeftIcon style={{ fontSize: 40 }} />
          </IconButton>
          <AnswerField
            className={["svg-draw-container", "shapes solution"]}
            points={
              currentShapePoints
            }
          />

          <IconButton
            aria-label="next"
            style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
          >
            <ChevronRightIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default QuestionField;
