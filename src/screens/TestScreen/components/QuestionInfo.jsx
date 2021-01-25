import React, { useRef, useEffect, useState } from 'react'
import { reScaledShapes } from '../../../utils/boardUtils'
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
                return (<ShapesInfo key={JSON.stringify(shape)} shape={shape} infoType={props.infoType} />);
            })}
        </svg>
    )
}

export default QuestionInfo
