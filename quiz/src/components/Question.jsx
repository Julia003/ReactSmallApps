import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorect: null,
  });

  let timer = 15000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer) {
    if (answer.isCorect === null) {
      answerState = "answered";
    } else {
      answerState = answer.isCorect ? "correct" : "wrong";
    }
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
