import React, { useState, useEffect } from "react";
import TestSteps from "./components/TestSteps";
import Exercises from "./components/Exercises";
import ExerciseInfo from "../../components/ExerciseInfo";
import { normalizePoint } from "../../utils/boardUtils";
import TestAnswersContext from "./context";
import "./style.css";

export default () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const questions = JSON.parse(window.localStorage.getItem("questions"));
    setQuestions(questions);
    setCurrentQuestion(0);
  }, []);

  useEffect(() => {
    // saving the answer of every question's branch
    setAnswers(
      questions.map((question) =>
        question.branches.map((branch) => ({
          lines: [],
          history: {
            numberOfDeletions: 0,
            numberOfRightRotations: 0,
            numberOfLeftRotations: 0,
          },
          boardSize: 0,
        }))
      )
    );
  }, [currentQuestion]);

  // const handleSubmit = (event) => {
  //   console.log(answers);
  //   window.localStorage.setItem('sample-answers', JSON.stringify(answers.map(answer => {
  //     return answer.map(branchAnswers => {
  //       console.log(branchAnswers);
  //       const { lines, boardSize } = branchAnswers;
  //       const normalizedLines = [...lines].map(line => {
  //         const [point_1, point_2] = [normalizePoint(line.point_1, boardSize), normalizePoint(line.point_2, boardSize)];
  //         return { point_1, point_2 };
  //       })
  //       return { lines: normalizedLines };
  //     })
  //   })))
  // }

  if (currentQuestion === -1 || !answers.length) {
    return <div>Loading ...</div>;
  }

  return (
    <TestAnswersContext.Provider
      value={{ answers, setAnswers, currentQuestion }}
    >
      <div className="main-question-container">
        {/* <button onClick={handleSubmit}>Submit</button> */}
        <TestSteps />
        <div className="question-section">
          <div className="question-timer">
            <div className="question">
              <ExerciseInfo
                question={questions[currentQuestion].question}
                infoType="line"
              />
              <ExerciseInfo question={questions[currentQuestion].question} />
            </div>
          </div>
          <Exercises branches={questions[currentQuestion].branches} />
        </div>
      </div>
    </TestAnswersContext.Provider>
  );
};
