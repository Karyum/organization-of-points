import React ,{useRef,useEffect,useState}from "react";
// import { lines } from "../../../utils/consts";
import { adjustShapeToBoard } from "../../../utils/boardUtils";

function ShapesInfo(props) {
  const boardRef = useRef();
  const [boardSize,setBoardSize] = useState(1);
  const [lines, setLines] = useState([])
  useEffect(() => {
    setBoardSize(boardRef.current.clientHeight);
  },)

  useEffect(() => {
    const adjustedShape = adjustShapeToBoard(props.shape,boardSize);
    setLines(adjustedShape);
  }, [boardSize])

 
  return (
    <svg ref={boardRef} className="question-shapes shapes">
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
