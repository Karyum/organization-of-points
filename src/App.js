import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import SvgScreen from "./screens/SvgScreen";
import { useMousePosition } from "./utils/useMousePosition";

function App() {
  const position = useMousePosition();
  const lineContainer = useRef();

  const [graph, setGraph] = useState({
    points: [
      {
        cx: 1,
        cy: 1,
      },
      {
        cx: 0,
        cy: 0,
      },
      {
        cx: 0,
        cy: 0,
      },
      {
        cx: 0,
        cy: 0,
      },
    ],
    lines: [
      { x1: 2, y1: 2, x2: 3, y2: 4 },
      { x1: 2, y1: 2, x2: 3, y2: 4 },
      { x1: 2, y1: 2, x2: 3, y2: 4 },
      { x1: 2, y1: 2, x2: 3, y2: 4 },
    ],
  });

  const handleLine = (e) => {
    console.log("test");
  };
  const handleCircle = (e) => {
    // const newLine = document.createElement("line");
    const newLine = `<line x1="20" y1="20" x2="${position.x}" y2="${position.y}" strokeWidth="4" stroke="black" />`;

    const id = e.target.id;
    if (id === "c1") {
      // newLine.current.setAttribute("x1", "20");
      // newLine.setAttribute("y1", "20");
      // newLine.setAttribute("x2", "100");
      // newLine.setAttribute("y2", "100");
      // newLine.setAttribute("strokeWidth", "4");
      // newLine.setAttribute("stroke", "black");
      // lineContainer.current.appendChild(newLine);
    }

    lineContainer.current.insertAdjacentHTML("beforeend", newLine);
  };

  return (
    <div className="App" onClick={(e) => console.log(e.clientX, e.clientY)}>
      <SvgScreen
        handleCircle={handleCircle}
        handleLine={handleLine}
        lineContainer={lineContainer}
      />
      <div style={{ color: "#fff" }}>
        {position.x}:{position.y}
      </div>
    </div>
  );
}

export default App;

{
  /* <line
            id="l1"
            onClick={handleLine}
            x1="20"
            y1="20"
            x2="100"
            y2="20"
            strokeWidth="4"
            stroke="black"
          /> */
}
