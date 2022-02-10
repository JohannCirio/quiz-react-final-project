import React from "react";
import { AnswerType } from "../interfaces/interfaces";

export default function Answer(props: {
  questionText: string;
  answerData: AnswerType;
  handleAnswerClick: Function;
  showResult: boolean;
}) {
  function isCorrect() {
    return props.answerData.isCorrect;
  }

  function isWrong() {
    return props.answerData.isSelected && !props.answerData.isCorrect;
  }

  function answerColor() {
    if (props.answerData.isSelected && !props.showResult) {
      return "#D6DBF5";
    } else if (isCorrect() && props.showResult) {
      return "#94D7A2";
    } else if (isWrong() && props.showResult) {
      return "#F8BCBC";
    } else {
      return "";
    }
  }

  const styles = {
    backgroundColor: answerColor(),
  };

  return (
    <button
      type="button"
      onClick={(event) => props.handleAnswerClick(event)}
      className="answer-button"
      name={props.questionText}
      value={props.answerData.text}
      style={styles}
    >
      {props.answerData.text}
    </button>
  );
}
