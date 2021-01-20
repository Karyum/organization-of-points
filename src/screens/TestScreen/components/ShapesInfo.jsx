import React from "react";

function ShapesInfo(props) {
  return (
    <svg className="question-shapes shapes">
      {props.linesArr
        ? props.linesArr.map((line, index) => {
            return (
              <line
                key={"index" + index}
                x1={line.point_1.x}
                y1={line.point_1.y}
                x2={line.point_2.x}
                y2={line.point_2.y}
                stroke="blue"
                strokeWidth="1"
              />
            );
          })
        : props.pointsArr.map((point, index) => {
            return (
              <circle key={index} cx={point.x} cy={point.y} r="10" fill="red" />
            );
          })}
    </svg>
  );
}

export default ShapesInfo;
