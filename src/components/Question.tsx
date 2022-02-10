import React from "react";
import Answer from "./Answer";
import { QuestionType } from "../interfaces/interfaces";

export default function Question(props: {
  questionData: QuestionType;
  handleAnswerClick: Function;
  showResult: boolean;
}) {
  const answerElements = props.questionData.answers.map((answer) => {
    return (
      <Answer
        handleAnswerClick={props.handleAnswerClick}
        answerData={answer}
        questionText={props.questionData.question}
        showResult={props.showResult}
      ></Answer>
    );
  });
  return (
    <div className="question-container">
      <h2>{props.questionData.question}</h2>
      <div className="answers-container">{answerElements}</div>
    </div>
  );
}
