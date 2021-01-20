import React, { useRef, useState, useEffect, useCallback } from "react";
import { Line } from "../Graph";
import {shapes} from '../../utils/dataStore'
import "./style.css";

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function normalizePoint(point, factor){
  const {x,y} = point;
  if(factor != 0){
    return{x: x/factor, y:y/factor}
  }
}

const addLine = "add";
const adjustLine = "adjust";
const deleteLine = "delete";
const submitGraph = "submit";
const minTwoPointsDistance = 20;

export default function DrawBoard(props) {
  const boardRef = useRef();
  const [boardSize, setBoardSize] = useState(0);
  const [isDeleteActive, SetDeleteActivion] = useState(false);
  const [linesNum, setLinesNum] = useState(3);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [lines, setlines] = useState([]);

  const getMousePosition = useCallback(
    (evt) => {
      const point = boardRef.current.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      const {x,y} = point.matrixTransform(
        boardRef.current.getScreenCTM().inverse()
      );
      return {x,y};
    },
    [boardRef]
  );

  const getSelectedPoint = useCallback(
    (point, index) => {
      if (index < lines.length) {
        return lines[index][point];
      }
    },
    [linesNum]
  );

  const startDrag = useCallback(
    (evt) => {
      if (evt.target.classList.contains("draggable")) {
        console.log("start drag ....");
        const { point, index } = evt.target.dataset;
        const pointCoordinates = getSelectedPoint(point, index);
        if (pointCoordinates) {
          const offset = getMousePosition(evt);
          offset.x -= pointCoordinates.x;
          offset.y -= pointCoordinates.y;
          console.log(offset);
          setSelectedPoint({
            point,
            index,
            offset,
          });
        }
      } else if (evt.target.classList.contains("erasable")) {
        console.log("object is erasable...");
        const index = evt.target.dataset.index;
        setlines(prev =>{
          console.log(prev)
          return prev.filter((_,i) => i != index);
        })
      }
    },

    [setSelectedPoint, getSelectedPoint,setlines]
  );

  const drag = useCallback(
    (evt) => {
      if (selectedPoint) {
        evt.preventDefault();
        const position = getMousePosition(evt);
        const { point, index, offset } = selectedPoint;
        const actualPoint = getSelectedPoint(point, index);
        actualPoint.x = position.x - offset.x;
        actualPoint.y = position.y - offset.y;
        setlines((prevPoints) => [...prevPoints]);
      }
    },
    [selectedPoint, getMousePosition, getSelectedPoint]
  );

  const endDrag = useCallback(
    (evt) => {
      boardRef.current.removeEventListener("mousemove", drag);
      if (selectedPoint) {
        const { point, index, offset } = selectedPoint;
        const actualPoint = getSelectedPoint(point, index);
        if (actualPoint) {
          let closestPointFound = false;
          lines.forEach((line, index) => {
            if (!closestPointFound) {
              if (distance(actualPoint, line.point_1) < minTwoPointsDistance) {
                actualPoint.x = line.point_1.x;
                actualPoint.y = line.point_1.y;
                closestPointFound = true;
              } else if (
                distance(actualPoint, line.point_2) < minTwoPointsDistance
              ) {
                actualPoint.x = line.point_2.x;
                actualPoint.y = line.point_2.y;
                closestPointFound = true;
              }
            }
          });
          setlines((prevPoints) => [...prevPoints]);
        }
        setSelectedPoint(null)
      }
    },
    [boardRef, drag, selectedPoint]
  );

    useEffect(() => {
      setBoardSize(boardRef.current.clientHeight);
    }, [])
  

  useEffect(() => {
    boardRef.current.addEventListener("mousedown", startDrag);
    boardRef.current.addEventListener("mouseup", endDrag);
    boardRef.current.addEventListener("mouseleave", endDrag);
  }, [boardRef, drag, startDrag, endDrag]);

  useEffect(() => {
    boardRef.current.addEventListener("mousemove", drag);
  }, [selectedPoint]);

  // tool handlers

  const handleAddLine = (event) => {
    const newLine = {
      point_1: {
        x: 20,
        y: 280,
      },
      point_2: {
        x: 20,
        y: 240,
      },
    };

    setlines((prev) => {
      prev.push({ ...newLine });
      return [...prev];
    });

    setLinesNum((prev) => prev + 1);
    SetDeleteActivion(false);
  };

  const handleDeleteLine = (event) => {
    console.log("delete activated...");
    SetDeleteActivion(true);
  };

  const handleClear = (event) => { 
    setlines([]); 
  };

  const handleSubmitGraph = (event) => { 
    const myStorage = window.localStorage;
    const normalizedLines = [...lines].map(line => {
      let {point_1,point_2} = line;
      point_1=normalizePoint(point_1,boardSize);
      point_2=normalizePoint(point_2,boardSize);
      return{point_1,point_2};
    })
    let shapes = myStorage.getItem('myShapes');
    if(shapes){
      shapes = JSON.parse(shapes);
      shapes.push(normalizedLines);
      myStorage.setItem("myShapes",JSON.stringify(shapes));
      return;
    }
    shapes = [];
    shapes.push(normalizedLines);
    myStorage.setItem('myShapes',JSON.stringify(shapes));
  };
  return (
    <div className="painter">
      <svg
        ref={boardRef}
        id="mainBoard"
        xmlns="http://www.w3.org/2000/svg"
        className="draw-board"
      >
        {lines.map((line, index) => {
          return (
            <Line
              key={JSON.stringify(line) + index}
              {...line}
              index={index}
              fill={index === lines.length - 1 ? "blue" : "red"}
              deleteLine={isDeleteActive}
            />
          );
        })}
      </svg>
      <div className="actions">
        <button name={addLine} onClick={handleAddLine}>
          Add Line
        </button>
        <button name={deleteLine} onClick={handleDeleteLine}>
          delete Line
        </button>
        <button name={deleteLine} onClick={handleClear}>
          clear all
        </button>
        <button name={submitGraph} onClick={handleSubmitGraph}>
          submit Graph
        </button>
      </div>
    </div>
  );
}
