import "./App.css";
import React, { useRef, useEffect } from "react";
import SvgScreen from "./screens/SvgScreen";
import { useMousePosition } from "./utils/useMousePosition";

function App() {
  const position = useMousePosition();

  const line2 = useRef();
  const handleLine = (e) => {
    const id = e.target.id;
    if (id === "l2") {
      console.log(line2.current);
    }
  };
  const handleCircle = (e) => console.log(e.target.id);

  return (
    <div className="App">
      <SvgScreen
        handleCircle={handleCircle}
        handleLine={handleLine}
        line2={line2}
      />
      <div style={{ color: "#fff" }}>
        {position.x}:{position.y}
      </div>
    </div>
  );
}

export default App;
