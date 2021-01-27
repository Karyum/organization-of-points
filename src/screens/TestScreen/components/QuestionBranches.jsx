import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AnswerField from "./AnswerField";
import "../style.css";
function QuestionBranches(props) {
  const [count, setCount] = useState(0);

  const nextShape = () => {
    if (count !== props.branches.length - 1) {
      setCount((prev) => prev + 1);
    }
  };

  const prevShape = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount((prev) => prev - 1);
    }
  };
  return (
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
        branch={props.branches[count]}
        branchId={count}
      />

      <IconButton
        aria-label="next"
        style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
        onClick={nextShape}
      >
        <ChevronRightIcon style={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
}

export default QuestionBranches;
