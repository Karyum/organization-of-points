import React from "react";

function SvgScreen(props) {
  const { handleCircle, handleLine, lineContainer } = props;
  return (
    <div style={{ padding: 10, borderWidth: 1, borderColor: "#000" }}>
      <svg style={{ width: "100%", height: "100vh" }}>
        <g fill="grey" transform="rotate(0 0 0)">
          <circle
            id="c1"
            onClick={handleCircle}
            cx="20"
            cy="20"
            r="10"
            fill="red"
          />
          <circle
            id="c2"
            onClick={handleCircle}
            cx="100"
            cy="100"
            r="10"
            fill="red"
          />
          <circle
            id="c3"
            onClick={handleCircle}
            cx="100"
            cy="20"
            r="10"
            fill="red"
          />
          <circle
            id="c4"
            onClick={handleCircle}
            cx="20"
            cy="100"
            r="10"
            fill="red"
          />
        </g>
        <g
          ref={lineContainer}
          id="lines-container"
          fill="grey"
          transform="rotate(0 40 100)"
        ></g>
      </svg>
    </div>
  );
}

export default SvgScreen;

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
          />
          <line
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
          /> */
}

//   <circle
//   id="c1"
//   onClick={handleCircle}
//   cx="20"
//   cy="20"
//   r="6"
//   fill="red"
// />
// <circle
//   id="c2"
//   onClick={handleCircle}
//   cx="100"
//   cy="100"
//   r="6"
//   fill="red"
// />
// <circle
//   id="c3"
//   onClick={handleCircle}
//   cx="100"
//   cy="20"
//   r="6"
//   fill="red"
// />
// <circle
//   id="c4"
//   onClick={handleCircle}
//   cx="20"
//   cy="100"
//   r="6"
//   fill="red"
// />
