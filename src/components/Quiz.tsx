import React from "react";
import Question from "./Question";
import { QuestionType } from "../interfaces/interfaces";

export default function Quiz(props: {
  questionsData: QuestionType[];
  handleAnswerClick: Function;
  triggerResults: Function;
  triggerNewGame: Function;
  showResult: boolean;
  showQuiz: boolean;
}) {
  function totalCorrectAnswers() {
    let total = 0;
    for (let i = 0; i < props.questionsData.length; i++) {
      if (
        props.questionsData[i].answers.some(
          (answer) => answer.isSelected && answer.isCorrect
        )
      ) {
        total++;
      }
    }
    return total;
  }

  const questionElements = props.questionsData.map((questionData) => {
    return (
      <Question
        handleAnswerClick={props.handleAnswerClick}
        questionData={questionData}
        showResult={props.showResult}
      ></Question>
    );
  });
  return (
    <div className="quiz-container">
      {questionElements}
      {!props.showResult && props.showQuiz && (
        <div className="check-answers-container">
          <button
            onClick={() => props.triggerResults()}
            type="button"
            className="check-answers-button"
          >
            Check answers
          </button>
        </div>
      )}
      {props.showResult && (
        <div className="result-container">
          <p>You got {totalCorrectAnswers()} rigth answers! </p>
          <button
            onClick={() => props.triggerNewGame()}
            type="button"
            className="check-answers-button"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
