import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { getShapePoints, reScaledShapes } from "../../../utils/boardUtils"
import { ExamAnswersContext } from './context'
import "../style.css";

function AnswerField(props) {

  const svgRef = useRef();
  //states
  const [svgSize, setSvgSize] = useState(1);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState({
    point1: null,
    point2: null,
  });
  const [action, setAction] = useState("add");

  /// connect the branch shapes given branch== array of shapes....

  const [branchShapes, setBranchShapes] = useState([]);

  const { answers, setAnswers, currentQuestion } = useContext(ExamAnswersContext);

  useEffect(() => {
    setAnswers(prev => {
      prev[currentQuestion][props.branchId].lines = lines;
      return [...prev];
    });
    return () => {
      setLines(answers[currentQuestion][props.branchId].lines);
    }
  }, [props.branchId, currentQuestion])


  useEffect(() => {
    console.log(answers);
    console.log(lines);
  }, [])



  useEffect(() => {
    setBranchShapes(prev => {
      return reScaledShapes(props.branch, svgSize);
    })
    // setLines([]);
  }, [props.branch, svgSize])

  useEffect(() => {
    setSvgSize(svgRef.current.clientHeight);
  }, []);

  // useEffect(() => {
  //   setAnswers(prev => {
  //     const currentBranch = prev[currentQuestion][props.branchId];
  //     currentBranch.lines = lines;
  //     return [...prev];
  //   })
  // }, [lines]);



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
          className={`${props.className[1] ? props.className[1] : "question-branch-paper"
            } add-cursor`}
          transform={`rotate(${rotateAngle},0,0)`}
        >
          <g>
            {lines.map((l, index) => {
              return (
                <line
                  key={JSON.stringify(l) + index}
                  x1={l.point1.x}
                  y1={l.point1.y}
                  x2={l.point2.x}
                  y2={l.point2.y}
                  strokeWidth="3"
                  stroke="green"
                  data-index={index}
                  className={`graph-line ${action === "delete" ? "delete-cursor" : "add-cursor"
                    }`}
                  onClick={handleLineClick}
                />
              );
            })}
          </g>
          {branchShapes.map(shape => {
            return (<g key={JSON.stringify(shape)}>
              {getShapePoints(shape).map((point, index) => {
                return (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="red"
                    onClick={handleCircleClick}
                  />
                );
              })
              }
              {
                // shap.map(line => {
                //   const { point_1, point_2 } = line;
                //   return <line x1={point_1.x} y1={point_1.y} x2={point_2.x} y2={point_2.y} stroke="blue" strokeWidth='3' />
                // })
              }
            </g>)
          })
          }

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
};

export default AnswerField;
