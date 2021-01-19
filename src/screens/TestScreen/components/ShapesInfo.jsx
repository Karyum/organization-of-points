import React from "react";
import { lines } from "../../../utils/consts";

function ShapesInfo(props) {
  return (
    <svg className="question-shapes shapes">
      {lines.map((line, index) => {
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
      })}
    </svg>
  );
}

export default ShapesInfo;
