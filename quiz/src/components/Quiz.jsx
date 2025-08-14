import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizOver = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (isQuizOver) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
