import React,{useRef} from 'react'
import '../style.css';
function AnswerField(props) {
  const svgRef = useRef()

  const handleLeftRotate =(event)=>{
      console.log(svgRef.current);
  }
    return (
        <div>
            <svg  ref={svgRef} className="question-branch-paper" >
                <g transform="rotate(70,150,150)">
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
                <button className="tool-btn">right Rotate</button>
                <button className="tool-btn"> erase</button>
                <button className="tool-btn">line</button>
                
            </div>
        </div>
    )
}

export default AnswerField


