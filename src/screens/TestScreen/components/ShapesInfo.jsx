import React from "react";

function ShapesInfo(props) {
  let lines = [{ point1: { x: 100, y: 200 }, point2: { x: 200, y: 200 } }];
  return (
    <svg className="question-shapes shapes">
      {lines.map((line, index) => {
        return (
          <line
            key={"index" + index}
            x1={line.point1.x}
            y1={line.point1.y}
            x2={line.point2.x}
            y2={line.point2.y}
            stroke="blue"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

export default ShapesInfo;
