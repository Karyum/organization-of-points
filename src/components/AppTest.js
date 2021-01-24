import React, { useEffect } from "react";
import DrawBoard, { ExerciseWriter } from "./DrawBoard";
import AnswerField from "../screens/TestScreen/components/AnswerField";
import Graph from "./Graph";
import "./style.css";
import QuestionField from "../screens/TestScreen/components/QuestionField";
import Result from "../screens/TestScreen/components/Result";
import shapes from "../../src/data/shapes.json";
export default function AppTest() {
  useEffect(() => {
    window.localStorage.setItem("shapes", JSON.stringify(shapes));
  }, []);
  return (
    <QuestionField />
    // <ExerciseWriter></ExerciseWriter>
    // <DrawBoard></DrawBoard>
  );
}
