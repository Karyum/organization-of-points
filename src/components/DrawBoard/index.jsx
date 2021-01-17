import React, { useRef, useState, useEffect ,useCallback} from 'react'
import  { Line } from '../Graph'
import './style.css'

function distance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}

const scaleLine = 'scale line';
const deleteLine = 'delete line';
const submitGraph = 'submit graph'


export default function DrawBoard(props) {
    const boardRef = useRef()
    const [boardSize, setBoardSize] = useState(0);
    const [action,setAction] = useState(scaleLine)
    const [selectedPoint,setSelectedPoint] = useState(null);
    const [linePoints, setLinePoints] = useState([
        {
          point_1: {
            x: 100,
            y: 100,
          },
          point_2: {
            x: 200,
            y: 100,
          },
        },
        {
          point_1: {
            x: 200,
            y: 100,
          },
          point_2: {
            x: 200,
            y: 200,
          },
        },
        {
          point_1: {
            x: 200,
            y: 200,
          },
          point_2: {
            x: 100,
            y: 100,
          },
        },
      ])

    const  getMousePosition = useCallback(
        (evt) => {
            const point = boardRef.current.createSVGPoint();
            point.x = evt.clientX;
            point.y = evt.clientY;
            const position = point.matrixTransform(boardRef.current.getScreenCTM().inverse());
            console.log("getMousePosition >>", position);
            return position;
        }
       ,
        [boardRef]
    )

    function getSelectedPoint(point, index){
        return linePoints[index][point];
    }

    const startDrag = useCallback(
        (evt)=> {
            if (evt.target.classList.contains("draggable")) {
                console.log("start drag ....");
                const {point,index} = evt.target.dataset;
                const pointCoordinates = getSelectedPoint(point,index);
               const offset = getMousePosition(evt);
                offset.x -= pointCoordinates.x;
                offset.y -= pointCoordinates.y;
                console.log(offset);
                setSelectedPoint({
                    point,index,offset
                })
            }
        }
    
       , [setSelectedPoint]
    )


    const drag = useCallback(
        (evt)=>{
            console.log("drag ....");
            console.log(selectedPoint)
            if (selectedPoint ) {
                evt.preventDefault();
                const position = getMousePosition(evt);
                const {point,index,offset} = selectedPoint;
                const actualPoint = getSelectedPoint(point,index)
                actualPoint.x = position.x - offset.x;
                actualPoint.y = position.y - offset.y;
                console.log(linePoints)
                setLinePoints(prevPoints => [...prevPoints]);
            }
        },
        [selectedPoint,getMousePosition]
    )


    const endDrag = useCallback(
        (evt)=> {
            console.log("end drag ....");
            boardRef.current.removeEventListener('mousemove',drag);
        },
        [boardRef,drag],
    )

    useEffect(() => {
        setBoardSize(boardRef.current.clientHeight);
        console.log("reloaded")
        boardRef.current.addEventListener("mousedown", startDrag)
        boardRef.current.addEventListener("mousemove", drag)
        boardRef.current.addEventListener("mouseup", endDrag)
        boardRef.current.addEventListener("mouseleave", endDrag)
    }, [boardRef,drag,startDrag,endDrag])
   
    const result = [];
    const points = linePoints.map(line => {
        result.push(line.point_1);
        result.push(line.point_2);
    } )
  
    return (
        <div className="painter">
            <svg ref={boardRef} id="mainBoard" xmlns="http://www.w3.org/2000/svg" className='draw-board'>
            {/* {linePoints.map((line,index) => {
                return <Line key={JSON.stringify(line)} {...line} index={index} />
            })} */}
            {

            }
         </svg>
         <div className="actions">
             <button >Add Line</button>
             <button>delete Line</button>
             <button>submit Graph</button>
         </div>
        </div>
        
    )
}


