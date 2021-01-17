import React from "react";
import DrawBoard, { DrawBoard2 } from "./DrawBoard";
import AnswerField from "../screens/TestScreen/components/AnswerField";
import Graph from "./Graph";
import "./style.css";
export default function AppTest() {
  return (
    <AnswerField
      points={[
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 200 },
      ]}
    />
  );
}
