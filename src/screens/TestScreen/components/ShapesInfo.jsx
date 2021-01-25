function ShapesInfo(props) {
  return (<g>
    {
      props.shape.map((line, index) => {
        return props.infoType === 'line' ? (
          <line
            key={"index" + index}
            x1={line.point_1.x}
            y1={line.point_1.y}
            x2={line.point_2.x}
            y2={line.point_2.y}
            stroke="blue"
            strokeWidth="1"
          />) :
          (<g key={"index" + index + index}>
            <circle cx={line.point_1.x} cy={line.point_1.y} r='3' fill='blue' />
            <circle cx={line.point_2.x} cy={line.point_2.y} r='3' fill='blue' />
          </g>)
      })
    }
  </g>)
}

export default ShapesInfo;
