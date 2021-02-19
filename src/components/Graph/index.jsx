import "./style.css";

const isConnectedWithDot = (lines, point1, point2, index) => {
  return lines
    .map((line, lineIndex) => {
      const currentPoint1 = line.point_1;
      const currentPoint2 = line.point_2;

      if (lineIndex !== index) {
        if (currentPoint1.x === point1.x && currentPoint1.y === point1.y) {
          return {
            ...line,
            commonPoint: {
              x: point1.x,
              y: point1.y,
            },
          };
        }

        if (currentPoint2.x === point2.x && currentPoint2.y === point2.y) {
          return {
            ...line,
            commonPoint: {
              x: point2.x,
              y: point2.y,
            },
          };
        }

        if (currentPoint2.x === point1.x && currentPoint2.y === point1.y) {
          return {
            ...line,
            commonPoint: {
              x: point1.x,
              y: point1.y,
            },
          };
        }

        if (currentPoint1.x === point2.x && currentPoint1.y === point2.y) {
          return {
            ...line,
            commonPoint: {
              x: point2.x,
              y: point2.y,
            },
          };
        }
      }

      return null;
    })
    .filter((x) => x)[0];
};

export function Line(props) {
  const { point_1, point_2, allLines, index } = props;
  let angle, connectedLine;
  console.log(index, index % 2);
  if (index !== 0) {
    connectedLine = isConnectedWithDot(allLines, point_1, point_2, index);
  }

  if (connectedLine) {
    const line1Slope =
      (connectedLine.point_2.y - connectedLine.point_1.y) /
      (connectedLine.point_2.x - connectedLine.point_1.x);

    const line2Slope = (point_2.y - point_1.y) / (point_2.x - point_1.x);
    angle =
      Math.atan((line2Slope - line1Slope) / (1 + line1Slope * line2Slope)) *
      (180 / Math.PI);
  }
  console.log(angle);

  return (
    <g fill={props.fill}>
      <circle
        cx={point_1.x}
        cy={point_1.y}
        r="5"
        className="draggable"
        data-index={index}
        data-point="point_1"
      />
      <circle
        cx={point_2.x}
        cy={point_2.y}
        r="5"
        className="draggable"
        data-index={index}
        data-point="point_2"
      />
      <line
        x1={point_1.x}
        y1={point_1.y}
        x2={point_2.x}
        y2={point_2.y}
        strokeWidth="2"
        stroke={props.fill}
        data-index={index}
        className={props.deleteLine ? "erasable" : "normal"}
      />
      {angle && (
        <text
          x={
            connectedLine?.commonPoint ? connectedLine.commonPoint.x - 8 : -500
          }
          y={
            connectedLine?.commonPoint ? connectedLine.commonPoint.y - 15 : -500
          }
          fill="black"
        >
          {angle >= 0 ? angle.toFixed(0) : +angle.toFixed(0) + 180}
        </text>
      )}
      <text x={(point_1.x + point_2.x) / 2} y={(point_1.y + point_2.y) / 2}>
        {Math.sqrt(
          Math.pow(point_1.x - point_2.x, 2) +
            Math.pow(point_1.y - point_2.y, 2)
        ).toFixed(0)}
      </text>
    </g>
  );
}

export default function Graph(props) {
  return (
    <g>
      {props.points.map((point) => {
        <circle cx={point.x} cy={point.y} r="5" />;
      })}
    </g>
  );
}
