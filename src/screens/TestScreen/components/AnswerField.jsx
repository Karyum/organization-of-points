import React, { useRef, useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import Timer from "../../../components/Timer";
import ExamSteps from "../../../components/ExamSteps";
import { lines, points } from "../../../utils/consts";
import "../style.css";

function AnswerField(props) {

  const svgRef = useRef();
  //states
  const [rotateAngle, setRotateAngle] = useState(0);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState({
    point1: null,
    point2: null,
  });
  const [action, setAction] = useState("add");

  //useEffect
  useEffect(() => {

    if (currentLine.point1 && currentLine.point2) {
      const reversedLine = {
        point1: currentLine.point2,
        point2: currentLine.point1,
      };
      if (
        !lines
          .map((line) => JSON.stringify(line))
          .includes(JSON.stringify(currentLine)) &&
        !lines
          .map((line) => JSON.stringify(line))
          .includes(JSON.stringify(reversedLine))
      ) {
        setLines((prev) => {
          return [...prev, currentLine];
        });
      }

      setCurrentLine({ point1: null, point2: null });
    }
  }, [currentLine]);

  // handlers
  const handleLineClick = (event) => {
  
    if (action === "delete") {
      
      const index = event.target.dataset.index;
      setLines((prev) => {
        prev[index] = "deleted";
        return prev.filter((line) => line !== "deleted");
      });
    }
  };

  const handleAction = (event) => {
    
    setAction(event.target.name);
  };

  const handleCircleClick = (event) => {
    const point = {
      x: event.target.getAttribute("cx"),
      y: event.target.getAttribute("cy"),
    };
    if (currentLine.point1 === null) {
      setCurrentLine({ point1: point, point2: null });
      return;
    }
    if (JSON.stringify(currentLine.point1) !== JSON.stringify(point)) {
      setCurrentLine((prev) => {
        return { ...prev, point2: point };
      });
    }

    console.log(point);
  };

  const handleLeftRotate = (event) => {
    setRotateAngle((prevangle) => prevangle - 10);
  };

  const handleRightRotate = (event) => {
    setRotateAngle((prevangle) => prevangle + 10);
  };
  return (
    <div className="answer-board-tools">
      <div className={props.className[0]}>
        <svg
          ref={svgRef}
          className={`${
            props.className[1] ? props.className[1] : "question-branch-paper"
          } add-cursor`}
          transform={`rotate(${rotateAngle},0,0)`}
        >
          <g>
            {lines.map((l, index) => {
              return (
                <line
                  key={index}
                  x1={l.point1.x}
                  y1={l.point1.y}
                  x2={l.point2.x}
                  y2={l.point2.y}
                  strokeWidth="3"
                  stroke="green"
                  data-index={index}
                  className={`graph-line ${
                    action === "delete" ? "delete-cursor" : "add-cursor"
                  }`}
                  onClick={handleLineClick}
                />
              );
            })}
            {props.points.map((point, index) => {
              return (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="10"
                  fill="red"
                  onClick={handleCircleClick}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="tools">
        <IconButton aria-label="left" onClick={handleLeftRotate}>
          <RotateLeftIcon style={{ fontSize: 40 }} />
        </IconButton>

        <IconButton aria-label="right" onClick={handleRightRotate}>
          <RotateRightIcon style={{ fontSize: 40 }} />
        </IconButton>
        <IconButton
          aria-label="erase"
          name="delete"
          onClick={(e) => {
            e.target.name = "delete";
            handleAction(e);
          }}
        >
          <DeleteSweepIcon style={{ fontSize: 40 }} />
        </IconButton>

        <IconButton aria-label="add" name="add" onClick={handleAction}>
          <LinearScaleIcon style={{ fontSize: 40 }} />
        </IconButton>
        <Button color="primary" >
          FINISH
        </Button>
      </div>
    </div>
  );
}

export default AnswerField;
