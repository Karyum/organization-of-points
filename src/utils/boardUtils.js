// const shapes = require("../data/shapes.json");
export function normalizePoint(point, factor) {
  const { x, y } = point;
  if (factor != 0) {
    return { x: x / factor, y: y / factor };
  }
}
export function scalePoint(point, factor) {
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
  return shape.reduce((acc, { point_1, point_2 }) => acc.concat([point_1, point_2]), [])
}

export function shapeCenter(shape) {
  const shapePoints = getShapePoints(shape);
  const x =
    (Math.max(...shapePoints.map((point) => point.x)) +
      Math.min(...shapePoints.map((point) => point.x))) /
    2;
  const y =
    (Math.max(...shapePoints.map((point) => point.y)) +
      Math.min(...shapePoints.map((point) => point.y))) /
    2;
  return { x, y };
}

export function shapeContainerParams(shape) {
  const shapePoints = getShapePoints(shape);
  const x = Math.min(...shapePoints.map((point) => point.x));
  const y = Math.min(...shapePoints.map((point) => point.y));
  const w = Math.max(...shapePoints.map((point) => point.x)) - x;
  const h = Math.max(...shapePoints.map((point) => point.y)) - y;
  return { x, y, w, h };
}

/**
 *
 * @param {*} points
 * @param {*} factor
 */
export function reScalePoints(points, factor) {
  return points.map((point) => {
    const { x, y } = point;
    return { x: x * factor, y: y * factor };
  });
}
function multiplayTwoVectors(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function vectorNorma(v) {
  return Math.sqrt(multiplayTwoVectors(v, v));
}

export function calcTowVectorsDeg(v1, v2) {
  return (
    Math.acos(
      multiplayTwoVectors(v1, v2) / (vectorNorma(v1) * vectorNorma(v2))
    ) *
    (180 / Math.PI)
  );
}

export function reScaledShapes(shapes, boardSize) {
  const rescaledShapes = shapes.map((shape) => {
    return adjustShapeToBoard(shape, boardSize);
  });
  return rescaledShapes;
}

export function applyRotate(vector, rotateDeg, center) {
  const { x, y } = applyTranslate(vector, { x: -center.x, y: -center.y });
  const [sinDeg, cosDeg] = [
    Math.sin(rotateDeg * (Math.PI / 180)),
    Math.cos(rotateDeg * (Math.PI / 180)),
  ];
  const [a, b] = [x * cosDeg - y * sinDeg, x * sinDeg + y * cosDeg];
  return applyTranslate({ x: a, y: b }, center);
}

export function applyTranslate(vector, translate) {
  return { x: vector.x + translate.x, y: vector.y + translate.y };
}

export function applyScale(vector) { }
