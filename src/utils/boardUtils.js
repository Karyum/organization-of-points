// const shapes = require("../../public/data.json");

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

/**
 *
 * @param {Array} shape - array of objects like {point_1{
 * x: x_xoordinate,
 * y: y_coordinate},
 * point_2{
 * x: x_xoordinate,
 * y: y_coordinate}}
 * @returns {Array} shape points - the shape points
 */

export function getShapePoints(shape) {
  const result = [];
  shape.forEach((line) => {
    const { point_1, point_2 } = line;
    result.push(point_1, point_2);
  });
  return result;
}
