import React, { useState, useEffect } from "react";
import ExamSteps from "../../../components/ExamSteps";
import Exercises from "./Exercises";
import QuestionInfo from "./QuestionInfo";
import { ExamAnswersContext } from "./context";
import { normalizePoint } from "../../../utils/boardUtils";

function QuestionField() {
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
      questions.map((question) => {
        return question.branches.map((branch) => {
          return {
            lines: [],
            history: {
              numberOfDeletions: 0,
              numberOfRightRotations: 0,
              numberOfLeftRotations: 0,
            },
            boardSize: 0,
          };
        });
      })
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
    <ExamAnswersContext.Provider
      value={{ answers, setAnswers, currentQuestion }}
    >
      <div className="main-question-container">
        {/* <button onClick={handleSubmit}>Submit</button> */}
        <ExamSteps />
        <div className="question-section">
          <div className="question-timer">
            <div className="question">
              <QuestionInfo
                question={questions[currentQuestion].question}
                infoType="line"
              />
              <QuestionInfo question={questions[currentQuestion].question} />
            </div>
          </div>
          <Exercises branches={questions[currentQuestion].branches} />
        </div>
      </div>
    </ExamAnswersContext.Provider>
  );
}

export default QuestionField;
