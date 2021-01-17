
import './style.css'
export function Line(props){
    const {point_1, point_2} = props;
    return (
        <g fill="red">
        <circle  cx={point_1.x} cy={point_1.y} r="5" className='draggable' data-index={props.index} data-point = 'point_1'/>
        <circle  cx={point_2.x} cy={point_2.y} r="5" className='draggable' data-index={props.index} data-point = 'point_2'/>
        <line x1={point_1.x} y1={point_1.y} x2={point_2.x} y2={point_2.y} strokeWidth="2" stroke='red' className="erasable" />
        </g>
        
    )
}

export default function Graph(props) {
  
    return (<g>
        {props.points.map(point=>{
               <circle  cx={point.x} cy={point.y} r="5" />
           })}
    </g>

           
    )
}
