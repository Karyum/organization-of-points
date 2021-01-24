import React, { useRef, useEffect, useState } from 'react'
import { adjustShapeToBoard, scalePoint, reScaledShapes } from '../../../utils/boardUtils'
import ShapesInfo from './ShapesInfo';
function useBoard(props) {
    const boardRef = useRef();
    const [size, setSize] = useState(1);
    useEffect(() => {
        setSize(boardRef.current.clientHeight);
    }, [boardRef])
    return [boardRef, size];
}
function QuestionInfo(props) {
    // props contain question => shapes => {lines,center,translate,rotate,scale}
    //first we must rescale the lines, translate, center
    //second: we pass each rescaled shape to ShapeInfo component and display it
    // third : lets start....
    // third canceled.... coffee please?... I'm back....
    const [boardRef, boardSize] = useBoard();
    const [questionShapes, setQuestionShapes] = useState([]);
    useEffect(() => {
        setQuestionShapes(prev => {
            return reScaledShapes(props.question, boardSize);
        })

    }, [boardSize, props.question]);

    return (
        <svg ref={boardRef} className={props.className ? props.className : "question-shapes shapes"}>
            {questionShapes.map(shape => {
                return (<ShapesInfo shape={shape} infoType={props.infoType} />);
            })}
        </svg>
    )
}

export default QuestionInfo
