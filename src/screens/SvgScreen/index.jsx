import React from "react";

function SvgScreen(props) {
  const { handleCircle, handleLine, line2 } = props;
  return (
    <div style={{ padding: 10, borderWidth: 1, borderColor: "#000" }}>
      <svg style={{ width: "100%", height: "100vh" }}>
        <g fill="grey" transform="rotate(120 40 100)">
          <circle
            id="c1"
            onClick={handleCircle}
            cx="20"
            cy="20"
            r="6"
            fill="red"
          />
          <circle
            id="c2"
            onClick={handleCircle}
            cx="100"
            cy="100"
            r="6"
            fill="red"
          />
          <circle
            id="c3"
            onClick={handleCircle}
            cx="100"
            cy="20"
            r="6"
            fill="red"
          />
          <circle
            id="c4"
            onClick={handleCircle}
            cx="20"
            cy="100"
            r="6"
            fill="red"
          />
        </g>
        <g fill="grey" transform="rotate(120 40 100)">
          <line
            id="l1"
            onClick={handleLine}
            x1="20"
            y1="20"
            x2="100"
            y2="20"
            strokeWidth="4"
            stroke="black"
          />
          <line
            ref={line2}
            id="l2"
            onClick={handleLine}
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            strokeWidth="4"
            stroke="black"
          />
          <line
            id="l3"
            onClick={handleLine}
            x1="20"
            y1="100"
            x2="20"
            y2="20"
            strokeWidth="4"
            stroke="black"
          />
          <line
            id="l4"
            onClick={handleLine}
            x1="20"
            y1="100"
            x2="100"
            y2="100"
            strokeWidth="4"
            stroke="black"
          />
        </g>
      </svg>
    </div>
  );
}

export default SvgScreen;
