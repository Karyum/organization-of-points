import React from "react";
import DrawBoard from "./DrawBoard";
import AnswerField from "../screens/TestScreen/components/AnswerField";
import Graph from "./Graph";
import "./style.css";
import QuestionField from "../screens/TestScreen/components/QuestionField";
import Result from "../screens/TestScreen/components/Result";

export default function AppTest() {
  return (
    // <Result result={6} />
    <QuestionField />
    // <AnswerField
    // points={[
    //   { x: 100, y: 100 },
    //   { x: 200, y: 100 },
    //   { x: 200, y: 200 },
    // ]}
    // />
  );
}
