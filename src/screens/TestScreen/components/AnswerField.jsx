import React, { useRef, useState, useEffect } from "react";
import "../style.css";

function AnswerField(props) {
  const svgRef = useRef();
  //states
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState({
    point1: null,
    point2: null,
  });
  const [action, setAction] = useState("add");

  //useEffect
  useEffect(() => {
    console.log(currentLine);

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
          console.log("testtt");
          return [...prev, currentLine];
        });
      }

      setCurrentLine({ point1: null, point2: null });
    }
  }, [currentLine]);

  useEffect(() => {
    svgRef.current.classList.toggle("delete-cursor");
    svgRef.current.classList.toggle("add-cursor");
  }, [action]);

  // handlers
  const handleLineClick = (event) => {
    if (action === "delete") {
      console.log(event.target.dataset);
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
    console.log(svgRef.current);
  };
  return (
    <div>
      <svg ref={svgRef} className="question-branch-paper delete-cursor">
        <g transform="rotate(70,150,150)">
          {lines.map((l, index) => {
            console.log(l);
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
      <div className="tools">
        <button className="tool-btn" onClick={handleLeftRotate}>
          left Rotate
        </button>
        <button className="tool-btn">right Rotate</button>
        <button className="tool-btn" name="delete" onClick={handleAction}>
          {" "}
          erase
        </button>
        <button className="tool-btn" name="add" onClick={handleAction}>
          line
        </button>
      </div>
    </div>
  );
}

export default AnswerField;