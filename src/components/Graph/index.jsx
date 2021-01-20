
import './style.css'
export function Line(props){
    const {point_1, point_2,factor} = props;
    return (
        <g fill={props.fill}>
        <circle  cx={point_1.x} cy={point_1.y} r="5" className='draggable' data-index={props.index} data-point = 'point_1'/>
        <circle  cx={point_2.x} cy={point_2.y} r="5" className='draggable' data-index={props.index} data-point = 'point_2'/>
        <line x1={point_1.x} y1={point_1.y} x2={point_2.x} y2={point_2.y} strokeWidth="2" stroke={props.fill} data-index={props.index} className={props.deleteLine? 'erasable':'normal'}/>
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
