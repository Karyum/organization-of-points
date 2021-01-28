import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import { Line } from "../Graph";
import { adjustShapeToBoard, shapeCenter, shapeContainerParams, calcTowVectorsDeg, applyRotate, applyTranslate, normalizePoint } from '../../../src/utils/boardUtils'
import "./style.css";

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}



function useSvgMousePosition(svgRef) {
  useEffect(() => {
    console.log('useSvgMousePosition mount...')
  }, [])

  useEffect(() => {
    console.log('useSvgMousePosition svgRef changed...')
  }, [svgRef])
  const mousePosition = useCallback(
    (evt) => {
      const point = svgRef.current.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      const { x, y } = point.matrixTransform(
        svgRef.current.getScreenCTM().inverse()
      );
      return { x, y };
    },
    [svgRef],
  )

  return mousePosition;

}

const minTwoPointsDistance = 20;

export default function DrawBoard(props) {
  const boardRef = useRef();
  const [boardSize, setBoardSize] = useState(0);
  const [isDeleteActive, SetDeleteActivion] = useState(false);
  const [linesNum, setLinesNum] = useState(3);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [lines, setlines] = useState([]);

  const getMousePosition = useSvgMousePosition(boardRef)

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
        setlines(prev => {
          console.log(prev)
          return prev.filter((_, i) => i != index);
        })
      }
    },

    [setSelectedPoint, getSelectedPoint, setlines]
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
      let { point_1, point_2 } = line;
      point_1 = normalizePoint(point_1, boardSize);
      point_2 = normalizePoint(point_2, boardSize);
      return { point_1, point_2 };
    })
    let shapes = myStorage.getItem('myShapes');
    if (shapes) {
      shapes = JSON.parse(shapes);
      shapes.push(normalizedLines);
      myStorage.setItem("myShapes", JSON.stringify(shapes));
      return;
    }
    shapes = [];
    shapes.push(normalizedLines);
    myStorage.setItem('myShapes', JSON.stringify(shapes));
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
        <button name="add" onClick={handleAddLine}>
          Add Line
        </button>
        <button name="delete" onClick={handleDeleteLine}>
          delete Line
        </button>
        <button onClick={handleClear}>
          clear all
        </button>
        <button name="submit" onClick={handleSubmitGraph}>
          submit Graph
        </button>
      </div>
    </div>
  );
}


const selectedShapesContext = React.createContext();

export function ExerciseWriter(props) {
  const [shapes, setShapes] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([])

  useEffect(() => {
    const shapesData = JSON.parse(window.localStorage.getItem('shapes'));
    setShapes(shapesData);
  }, [])





  return (
    <selectedShapesContext.Provider value={{ selectedShapes, setSelectedShapes, shapes }}>
      <div className="exam-writer-main">
        <ExamShapesBoard />
        <div className="exam-writer-shapes-container">
          <div className="exam-writer-shapes">
            {shapes.map((shape, index) => {
              return (<ShapeImage key={JSON.stringify(shape) + index} index={index} shape={shape} />)
            })}
          </div>
          <button>new shape</button>
        </div>
      </div>
    </selectedShapesContext.Provider>

  )
}

const actions = {
  rotate: {
    cursor: "rotatable",
    value: 'rotate'
  },
  delete: {
    cursor: "erasable",
    value: 'delete'
  },
  translate: {
    cursor: "moveable",
    value: 'translate'
  },

}



const ExamShapesBoard = React.memo((props) => {
  const paperRef = useRef();
  const [paperSize, setPaperSize] = useState(1);
  const [shapes, setShapes] = useState([]);
  const [shapesCount, setShapesCount] = useState(0);
  const [action, setAction] = useState({ ...actions.translate })
  const [selectedShape, setSelectedShape] = useState(null);

  const { selectedShapes, setSelectedShapes } = useContext(selectedShapesContext);

  const getMousePosition = useSvgMousePosition(paperRef);

  const getSelectedShape = useCallback(
    (index) => {
      if (index < shapesCount) {
        return shapes[index];
      }
    },
    [shapesCount],
  )

  const drag = useCallback(
    (evt) => {
      console.log("drag...")
      if (selectedShape) {
        const mousePosition = getMousePosition(evt);
        const { index, offset } = selectedShape;
        switch (action.value) {
          case 'translate':
            console.log('translate.....')
            setShapes(prev => {
              const currentShape = prev[index];
              currentShape.translate.x = mousePosition.x - offset.x;
              currentShape.translate.y = mousePosition.y - offset.y;
              return [...prev]
            })
            break;
          case 'rotate':
            console.log('rotate...')
            setShapes(prev => {
              const shape = prev[index];
              const { center, translate, scale } = shape;
              const relativeCenter = {
                x: (center.x + translate.x) * scale.x,
                y: (center.y + translate.y) * scale.y
              }
              const v1 = {
                x: offset.x - relativeCenter.x,
                y: offset.y - relativeCenter.y
              }
              const v2 = {
                x: mousePosition.x - relativeCenter.x,
                y: mousePosition.y - relativeCenter.y
              }
              const deg = calcTowVectorsDeg(v2, v1);
              console.log("current deg >>> ", deg)
              shape.rotateDeg = offset.prevDeg + deg
              return [...prev];
            })
            break;

          default:
            break;
        }

      }

    },
    [selectedShape, action, getMousePosition],
  )

  const startDrag = useCallback(
    (evt) => {
      const graph = evt.target.parentElement;
      if (graph && graph.classList.contains('graph')) {
        const { index } = graph.dataset
        const currentShape = getSelectedShape(index);
        const offset = getMousePosition(evt);
        switch (action.value) {
          case 'translate':
            console.log("Start Translate...");
            offset.x -= currentShape.translate.x;
            offset.y -= currentShape.translate.y;
            setSelectedShape({ index, offset })
            break;
          case 'rotate':
            console.log("Start Rotate...")
            offset.prevDeg = currentShape.rotateDeg;
            console.log({ index, offset });
            setSelectedShape({ index, offset })
            break;
          default:
            break;
        }

      }
    },
    [getMousePosition, setSelectedShape, getSelectedShape, action]
  )



  const endDrag = useCallback(
    (evt) => {
      console.log('end drag...')
      paperRef.current.removeEventListener('mousemove', drag);
      setSelectedShape(null);
    },
    [paperRef, drag, setSelectedShape]//, startDrag
  )


  useEffect(() => {
    console.log('rerendered... listner startDrag added')
    paperRef.current.addEventListener('mousedown', startDrag);
    return () => {
      paperRef.current.removeEventListener('mousedown', startDrag);
    }
  }, [paperRef, startDrag])

  useEffect(() => {
    console.log('rerendered... listner endDrag added')
    paperRef.current.addEventListener('mouseleave', endDrag);
    paperRef.current.addEventListener('mouseup', endDrag)
    return () => {
      paperRef.current.removeEventListener('mouseleave', endDrag);
      paperRef.current.removeEventListener('mouseup', endDrag)
    }

  }, [paperRef, endDrag])

  useEffect(() => {
    console.log(selectedShape);
    if (selectedShape) {
      paperRef.current.addEventListener('mousemove', drag);
    }

  }, [paperRef, selectedShape])

  useEffect(() => {
    setPaperSize(paperRef.current.clientHeight)
  }, [paperRef, setPaperSize])


  useEffect(() => {
    if (selectedShapes.length > 0) {
      setShapes(prev => {
        return [...prev, ...selectedShapes.map((shape, index) => {
          const adjustedShap = adjustShapeToBoard(shape, paperSize);
          return {
            lines: adjustedShap,
            center: shapeCenter(adjustedShap),
            container: shapeContainerParams(adjustedShap),
            rotateDeg: 0,
            translate: {
              x: 0,
              y: 0,
            },
            scale: {
              x: 1,
              y: 1
            }
          }
        })]
      })
      setShapesCount(count => count + 1);
      setSelectedShapes([]);

    }
  }
    , [selectedShapes, setSelectedShapes, paperSize, setShapes, setShapesCount, paperRef]);


  // handlers
  const handleActionClick = (event) => {
    console.log(event.target.name, 'had been clicked...')
    setAction({ ...actions[event.target.name] })
  }

  const handleSubmit = (event) => {
    const myStorage = window.localStorage;
    const normalizedShapes = shapes.map(shape => {
      let { lines, center, rotateDeg, translate, scale } = shape;
      const actualCenter = { x: (center.x + translate.x) * scale.x, y: (center.y + translate.y) * scale.y }

      lines = [...lines].map(line => {
        /// apply the rotate and translate on each line's point
        let { point_1, point_2 } = line;
        console.log({ point_1, point_2 });
        point_1 = applyTranslate(point_1, translate);
        point_2 = applyTranslate(point_2, translate);
        point_1 = applyRotate(point_1, rotateDeg, actualCenter);
        point_2 = applyRotate(point_2, rotateDeg, actualCenter);
        console.log("rotate >> ", rotateDeg);
        console.log({ point_1, point_2 });
        return { point_1, point_2 }

      }).map(line => {
        const [point_1, point_2] = [normalizePoint(line.point_1, paperSize), normalizePoint(line.point_2, paperSize)];
        return { point_1, point_2 };
      });
      return lines
    })

    let exercise = myStorage.getItem('exercise');
    if (exercise) {
      exercise = JSON.parse(exercise);
      exercise.push(normalizedShapes);
      myStorage.setItem('exercise', JSON.stringify(exercise));
      return;
    }
    exercise = [];
    exercise.push(normalizedShapes);
    myStorage.setItem('exercise', JSON.stringify(exercise));
    console.log(shapes);
  }


  return (
    <div className="exam-writer-paper">
      <svg ref={paperRef} className="exam-writer-draw-paper">
        {shapes.map((shape, index) => {
          const { lines, center, translate, rotateDeg, scale, container } = shape;
          return (
            <g data-index={index} data-center={JSON.stringify(shape.center)} data-action={action.value} key={JSON.stringify(shape) + index} fill="blue" transform={`rotate(${rotateDeg},${(center.x + translate.x) * scale.x},${(center.y + translate.y) * scale.y}) translate(${translate.x},${translate.y}) scale(${scale.x},${scale.y})`}
              className=" graph">
              <rect x={container.x} y={container.y} width={container.w} height={container.h} fill='transparent' className="moveable" data-index={index} data-action='translate' />
              {lines.map(line => {
                return <g key={JSON.stringify(line) + index} className='graph'>
                  <line
                    x1={line.point_1.x}
                    y1={line.point_1.y}
                    x2={line.point_2.x}
                    y2={line.point_2.y}
                    stroke="blue"
                    strokeWidth="1"
                  />
                  <line
                    x1={line.point_1.x}
                    y1={line.point_1.y}
                    x2={line.point_2.x}
                    y2={line.point_2.y}
                    stroke="transparent"
                    strokeWidth="10"
                    data-index={index}
                    data-action='scale'
                    className="resizable"
                  />
                  <circle cx={line.point_1.x} cy={line.point_1.y} r='10' fill='transparent' className="rotatable" data-index={index}
                    data-action='rotate' />
                  <circle cx={line.point_2.x} cy={line.point_2.y} r='10' fill='transparent' className='rotatable' data-index={index}
                    data-action='rotate' />
                </g>
              })}
            </g>)
        })}
      </svg>
      <div className="exam-writer-paper-tools">
        <button onClick={handleActionClick} name="delete">delete shape</button>
        <button onClick={handleActionClick} name="translate">move shape</button>
        <button onClick={handleActionClick} name="rotate">rotate shape</button>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  )
})



function ShapeImage(props) {
  const imageRef = useRef();
  const [imageSize, setImageSize] = useState(1);
  const [shape, setShape] = useState([]);
  const { setSelectedShapes, shapes } = useContext(selectedShapesContext);


  useEffect(() => {
    setImageSize(imageRef.current.clientHeight);
  }, [])

  useEffect(() => {
    const scaledShape = adjustShapeToBoard(props.shape, imageSize);
    setShape(scaledShape);
  }, [imageSize, props.shape]);

  return (
    <svg ref={imageRef} className='exam-writer-shape-image' index={props.index} onClick={() => setSelectedShapes(prev => [...prev, shapes[props.index]])}>
      {shape.map((line, index) => {
        return <line
          key={JSON.stringify(line) + index}
          x1={line.point_1.x}
          y1={line.point_1.y}
          x2={line.point_2.x}
          y2={line.point_2.y}
          stroke="blue"
          strokeWidth="1"
        />
      })}
    </svg>
  )
}
