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
  //useEffect
  useEffect(() => {
    console.log(lines);
  }, [lines]);

  useEffect(() => {
    console.log(currentLine);
    if (currentLine.point1 && currentLine.point2) {
      setLines((prev) => {
        console.log("testtt");
        return [...prev, currentLine];
      });
    }
  }, [currentLine, setLines]);

  const handleCircleClick = (event) => {
    const point = {
      x: event.target.getAttribute("cx"),
      y: event.target.getAttribute("cy"),
    };
    if (currentLine.point1 === null) {
      setCurrentLine({ point1: point, point2: null });
      return;
    }
    setCurrentLine((prev) => {
      return { ...prev, point2: point };
    });

    console.log(point);
  };

  const handleLeftRotate = (event) => {
    console.log(svgRef.current);
  };
  return (
    <div>
      <svg ref={svgRef} className="question-branch-paper">
        <g transform="rotate(70,150,150)">
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
          {lines.map((l, index) => {
            console.log(l);
            return (
              <line
                key={index}
                x1={l.point1.x}
                y1={l.point1.y}
                x2={l.point2.x}
                y2={l.point2.y}
                strokeWidth="1"
                stroke="green"
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
        <button className="tool-btn"> erase</button>
        <button className="tool-btn">line</button>
      </div>
    </div>
  );
}

export default AnswerField;
