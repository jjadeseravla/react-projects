import { useState, useCallback,} from "react";
import Question from './Question';
import Summary from "./Summary";

import QUESTIONS from "../questions";

function Quiz() {

  const [userAnswers, setUserAnswers] = useState([]);
  
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; 

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer]
      });
    }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),
    [handleSelectAnswer]);
  
  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    )
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        // selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}

export default Quiz;