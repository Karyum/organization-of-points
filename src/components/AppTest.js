import React, { useEffect } from "react";
import DrawBoard, { ExerciseWriter } from "./DrawBoard";
import AnswerField from "../screens/TestScreen/components/AnswerField";
import Graph from "./Graph";
import "./style.css";
import QuestionField from "../screens/TestScreen/components/QuestionField";
import Result from "../screens/TestScreen/components/Result";
import shapes from "../data/shapes.json";
import questions from "../data/Questions.json";
export default function AppTest() {
  useEffect(() => {
    window.localStorage.setItem("shapes", JSON.stringify(shapes));
    window.localStorage.setItem("questions", JSON.stringify(questions));
  }, []);
  return (
    <QuestionField />
    // <ExerciseWriter></ExerciseWriter>
    // <DrawBoard></DrawBoard>
  );
}
