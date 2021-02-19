import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { getShapePoints, reScaledShapes } from "../../../utils/boardUtils";
import { ExamAnswersContext } from "./context";
import "../style.css";

function AnswerField(props) {
  const svgRef = useRef();
  //states
  const [boardSize, setSvgSize] = useState(1);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState({
    numberOfDeletions: 0,
    numberOfRightRotations: 0,
    numberOfLeftRotations: 0,
  });

  const [currentLine, setCurrentLine] = useState({
    point_1: null,
    point_2: null,
  });

  const [action, setAction] = useState("add");

  /// connect the branch shapes given branch== array of shapes....

  const [shapes, setShapes] = useState([]);

  const { answers, setAnswers, currentQuestion } = useContext(
    ExamAnswersContext
  );

  useEffect(() => {
    setAnswers((prev) => {
      const exercise = prev[currentQuestion][props.prevBranch];

      exercise.lines = lines;
      exercise.history = history;
      exercise.boardSize = boardSize;

      return prev;
    });

    const { lines, history } = answers[currentQuestion][props.branchId];
    setLines(lines);
    setHistory(history);
  }, [props.branchId, currentQuestion]);

  useEffect(() => {
    setShapes(reScaledShapes(props.branch, boardSize));
  }, [props.branch, boardSize]);

  useEffect(() => {
    setSvgSize(svgRef.current.clientHeight);
  }, []);

  useEffect(() => {
    if (currentLine.point_1 && currentLine.point_2) {
      const reversedLine = {
        point_1: currentLine.point_2,
        point_2: currentLine.point_1,
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

      setCurrentLine({ point_1: null, point_2: null });
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
      setHistory((prev) => {
        let { numberOfDeletions } = prev;
        numberOfDeletions++;
        return { ...prev, numberOfDeletions };
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

    if (!currentLine.point_1) {
      setCurrentLine({ point_1: point, point_2: null });
      return;
    }

    if (JSON.stringify(currentLine.point_1) !== JSON.stringify(point)) {
      setCurrentLine((prev) => {
        return { ...prev, point_2: point };
      });
    }
  };

  const handleLeftRotate = (event) => {
    setRotateAngle((prevangle) => prevangle - 10);
    setHistory((prev) => {
      let { numberOfLeftRotations } = prev;
      numberOfLeftRotations++;
      return { ...prev, numberOfLeftRotations };
    });
  };

  const handleRightRotate = (event) => {
    setRotateAngle((prevangle) => prevangle + 10);
    setHistory((prev) => {
      let { numberOfRightRotations } = prev;
      numberOfRightRotations++;
      return { ...prev, numberOfRightRotations };
    });
  };

  return (
    <div className="answer-board-tools">
      <div className={props.className[0]}>
        <svg
          ref={svgRef}
          className={`${
            props.className[1] ? props.className[1] : "question-branch-paper"
          } add-cursor`}
          transform={`rotate(${
            10 *
            (history.numberOfRightRotations - history.numberOfLeftRotations)
          },0,0)`}
        >
          <g>
            {/* line are rendered here after someone clicked at least 2 dots */}
            {lines.map((l, index) => {
              return (
                <line
                  key={JSON.stringify(l) + index}
                  x1={l.point_1.x}
                  y1={l.point_1.y}
                  x2={l.point_2.x}
                  y2={l.point_2.y}
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
          </g>
          {/* refer to the shapes.json to see how this array looks like */}
          {shapes.map((shape) => {
            return (
              <g key={JSON.stringify(shape)}>
                {getShapePoints(shape).map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="red"
                    onClick={handleCircleClick}
                  />
                ))}
                {
                  // shap.map(line => {
                  //   const { point_1, point_2 } = line;
                  //   return <line x1={point_1.x} y1={point_1.y} x2={point_2.x} y2={point_2.y} stroke="blue" strokeWidth='3' />
                  // })
                }
              </g>
            );
          })}
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
      </div>
    </div>
  );
}

export default AnswerField;
