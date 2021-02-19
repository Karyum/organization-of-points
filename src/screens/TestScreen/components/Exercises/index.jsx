import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Exercise from "../Exercise";

function Exercises(props) {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  const nextShape = () => {
    if (count !== props.branches.length - 1) {
      setPrevCount(count);
      setCount((prev) => prev + 1);
    }
  };

  const prevShape = () => {
    if (count !== 0) {
      setPrevCount(count);
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="exercise-section">
      <IconButton
        aria-label="previous"
        style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
        onClick={prevShape}
      >
        <ChevronLeftIcon style={{ fontSize: 40 }} />
      </IconButton>
      <Exercise
        className={["svg-draw-container", "shapes solution"]}
        branch={props.branches[count]}
        branchId={count}
        prevBranch={prevCount}
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

export default Exercises;
