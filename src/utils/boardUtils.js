import shapes from "../../public/data.json";

function scalePoint(point, factor) {
  const { x, y } = point;
  return { x: x * factor, y: y * factor };
}

/**
 *
 * @param {Array} shape
 * @param {Number} boardSize
 * this function will fit normalized shape to your displaying square board
 */
export function adjustShapeToBoard(shape, boardSize) {
  return shape.map((line) => {
    const point_1 = scalePoint(line.point_1, boardSize);
    const point_2 = scalePoint(line.point_2, boardSize);
    return { point_1, point_2 };
  });
}
