import React, { useRef, useEffect, useState } from "react";
import { reScaledShapes, adjustShapeToBoard } from "../../../utils/boardUtils";
import ShapesInfo from "./ShapesInfo";
import { v4 as uuidv4 } from "uuid";

function useBoard(props) {
  const boardRef = useRef();
  const [size, setSize] = useState(1);
  useEffect(() => {
    setSize(boardRef.current.clientHeight);
  }, [boardRef]);
  return [boardRef, size];
}
function QuestionInfo(props) {
  const [boardRef, boardSize] = useBoard();
  const [questionShapes, setQuestionShapes] = useState([]);
  const [lines, setLines] = useState([]);

  const componentMount = useRef(true);

  useEffect(() => {
    console.log("QuestionInfo mount...");
    return () => {
      console.log("QuestionInfo unmount...");
      componentMount.current = false;
    };
  }, []);

  useEffect(() => {
    setQuestionShapes((prev) => {
      return reScaledShapes(props.question, boardSize);
    });
  }, [boardSize, props.question]);

  useEffect(() => {
    if (props.lines) {
      setLines([]);
      console.log(props.lines);
      const adjustedLines = adjustShapeToBoard(props.lines, boardSize);
      adjustedLines.forEach((line, index) => {
        setTimeout(() => {
          if (componentMount) {
            console.log("line index...", index);

            setLines((prev) => [...prev, line]);

            if (index === adjustedLines.length - 1) {
              props.Finish();
            }
          }
        }, (index + 1) * 700);
      });
    }
  }, [props.lines, boardSize, componentMount]);

  return (
    <svg
      ref={boardRef}
      className={props.className ? props.className : "question-shapes shapes"}
    >
      {questionShapes.map((shape) => {
        return (
          <ShapesInfo
            key={JSON.stringify(shape)}
            shape={shape}
            infoType={props.infoType}
          />
        );
      })}

      {!lines.length ? (
        lines.map(({ point_1, point_2 }, index) => (
          <line
            key={uuidv4()}
            x1={point_1.x}
            y1={point_1.y}
            x2={point_2.x}
            y2={point_2.y}
            stroke="blue"
            strokeWidth="2"
          />
        ))
      ) : (
        <g></g>
      )}
    </svg>
  );
}

export default QuestionInfo;
