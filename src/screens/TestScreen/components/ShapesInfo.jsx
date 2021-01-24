import React ,{useRef,useEffect,useState}from "react";
import { adjustShapeToBoard } from "../../../utils/boardUtils";

function ShapesInfo(props) {
  const boardRef = useRef();
  const [boardSize,setBoardSize] = useState(1);
  const [lines, setLines] = useState([])
  const [point, setPoint] =useState([]);
  useEffect(() => {
    setBoardSize(boardRef.current.clientHeight);
  },[props.shape])

  useEffect(() => {
    const adjustedShape = adjustShapeToBoard(props.shape,boardSize);
    setLines(adjustedShape);
  }, [boardSize, props.shape])

 
  return (
    <svg ref={boardRef} className={props.className? props.className :"question-shapes shapes"}>
      {lines.map((line, index) => {
        return props.infoType === 'line'?(
          <line
            key={"index" + index}
            x1={line.point_1.x}
            y1={line.point_1.y}
            x2={line.point_2.x}
            y2={line.point_2.y}
            stroke="blue"
            strokeWidth="1"
          /> ):
          (<g>
            <circle cx={line.point_1.x} cy={line.point_1.y}  r= '3' fill='blue'/>
          <circle cx={line.point_2.x} cy={line.point_2.y}  r= '3' fill='blue'/></g>)
      })}
    </svg>
  );
}

export default ShapesInfo;
