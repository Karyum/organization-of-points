import React, { useState, useEffect } from "react";
import ExamSteps from "../../../components/ExamSteps";
import QuestionBranches from './QuestionBranches'
import QuestionInfo from "./QuestionInfo";
import { ExamAnswersContext } from './context';

function QuestionField() {

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(-1);

  const [answers, setAnswers] = useState([]);


  useEffect(() => {
    setQuestions(JSON.parse(window.localStorage.getItem('questions')))
    setCurrentQuestion(0);
  }, [])

  useEffect(() => {
    // saving the answer of every question's branch
    setAnswers(questions.map(question => {
      return question.branches.map(branch => {
        return {
          lines: [],
          history: {
            numberOfDeletions: 0,
            numberOfRightRotations: 0,
            numberOfLeftRotations: 0,
          },
          boardSize: 0
        }

      })
    }))
  }, [questions]);

  if (currentQuestion === -1 || !answers.length) {
    return <div>Loading ...</div>
  }

  return (
    <ExamAnswersContext.Provider value={{ answers, setAnswers, currentQuestion }}>
      <div className="main-question-container">
        <ExamSteps />
        <div className="question-section">
          <div className="question-timer">
            <div className="question">
              <QuestionInfo question={questions[currentQuestion].question} infoType='line' />
              <QuestionInfo question={questions[currentQuestion].question} />
            </div>
          </div>
          <QuestionBranches branches={questions[currentQuestion].branches} />
        </div>
      </div>
    </ExamAnswersContext.Provider>
  );
}

export default QuestionField;
