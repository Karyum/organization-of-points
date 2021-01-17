import React,{useRef,useState} from 'react'
import '../style.css';
function AnswerField(props) {
  const svgRef = useRef()
  const [rotateAngle, setRotateAngle] = useState(0);
  const [lines,setLines] = useState([]);

  const handleLeftRotate =(event)=>{
      setRotateAngle(prevangle => prevangle-10)
  }

  const handleRightRotate =(event)=>{
    setRotateAngle(prevangle => prevangle+10)
}
    return (
        <div>
            <svg  ref={svgRef} className="question-branch-paper">
                <g transform={`rotate(${rotateAngle},150,150)`}>
                {props.points.map( (point,index) =>{
                    return (<circle key = {index} cx={point.x} cy ={point.y} r='10' fill = 'red'/>)
                })}
                </g>
                <g >
                {props.points.map( (point,index) =>{
                    return (<circle key = {index} cx={point.x} cy ={point.y} r='10' fill = 'blue'/>)
                })}
                </g>
            </svg>
            <div className="tools">
                <button className="tool-btn" onClick={handleLeftRotate}>left Rotate</button>
                <button className="tool-btn" onClick={handleRightRotate}>right Rotate</button>
                <button className="tool-btn"> erase</button>
                <button className="tool-btn">line</button>
                
            </div>
        </div>
    )
}

export default AnswerField


