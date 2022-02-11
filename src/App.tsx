import React from "react";
import "./App.css";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import {
  QuestionType,
  QuestionData,
  AnswerType,
} from "./interfaces/interfaces";

import axios from "axios";

function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[] | []>([]);
  const [showResult, setShowResult] = React.useState(false);

  function toggleSelectedAnswer(
    answers: AnswerType[],
    desiredAnswerText: string
  ) {
    if (!showResult) {
      return answers.map((answer) => {
        if (answer.text === desiredAnswerText) {
          return { ...answer, isSelected: true };
        } else {
          return { ...answer, isSelected: false };
        }
      });
    } else {
      return answers;
    }
  }

  function triggerResults() {
    if (checkIfAllHaveSelected()) {
      setShowResult(true);
    }
    console.log(showResult);
  }

  function checkIfAllHaveSelected() {
    return questions.every((question) => {
      return question.answers.some((answer) => answer.isSelected);
    });
  }

  function triggerNewGame() {
    setShowIntro(true);
    setShowResult(false);
    setShowQuiz(false);
    setQuestions([]);
  }

  console.log(questions);

  function handleAnswerClick(event: any) {
    console.log(event.target.value);
    setQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.map((oldQuestion) => {
        if (oldQuestion.question === event.target.name) {
          return {
            ...oldQuestion,
            answers: toggleSelectedAnswer(
              oldQuestion.answers,
              event.target.value
            ),
          };
        } else {
          return oldQuestion;
        }
      });
      return newQuestions;
    });
  }

  React.useEffect(() => {
    function shuffleArray(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    function parseAnswers(incorrectAnswers: string[], correctAnswer: string) {
      let answers = incorrectAnswers.map((answer) => {
        return {
          text: decodeURIComponent(answer),
          isCorrect: false,
          isSelected: false,
        };
      });

      answers.push({
        text: decodeURIComponent(correctAnswer),
        isCorrect: true,
        isSelected: false,
      });
      shuffleArray(answers);
      return answers;
    }

    function parseQuestionsData(questions: QuestionData[]): QuestionType[] {
      return questions.map((questionData) => {
        return {
          question: decodeURIComponent(questionData.question),
          answers: parseAnswers(
            questionData.incorrect_answers,
            questionData.correct_answer
          ),
        };
      });
    }

    if (!showIntro) {
      axios
        .get(
          "https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986"
        )
        .then((response) => {
          setQuestions(parseQuestionsData(response.data.results));
          setShowQuiz(true);
        });
    }
  }, [showIntro]);

  function beginNewGame() {
    setShowIntro(!showIntro);
  }

  return (
    <div className="App">
      {showIntro ? (
        <Intro beginNewGame={beginNewGame}></Intro>
      ) : (
        <Quiz
          handleAnswerClick={handleAnswerClick}
          questionsData={questions}
          triggerResults={triggerResults}
          showResult={showResult}
          showQuiz={showQuiz}
          triggerNewGame={triggerNewGame}
        ></Quiz>
      )}
    </div>
  );
}

export default App;
