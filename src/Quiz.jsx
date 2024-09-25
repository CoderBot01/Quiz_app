import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ questions, userName, category, numQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (isCorrect) => {
    setScore(isCorrect ? score + 1 : score - 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };
 
  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h2>Your Score: {score}</h2>
        <div className="message">
          {score === questions.length ? (
            <h3>WOW! You are a Genius {userName}!!!</h3>
          ) : score > questions.length * 0.8 ? (
            <h3>Great Job {userName}!</h3>
          ) : score >= questions.length * 0.5 ? (
            <h3>You could do better {userName}.</h3>
          ) : (
            <h3>Oh No! You need some groundwork {userName}!</h3>
          )}
          <button
          onClick={handlePlayAgain}
          >PLAY AGAIN</button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <h2>No questions available.</h2>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-container">
        <p>`Hi {userName}, you need to answer{numQuestions} questions on  {category}`</p>
      <h2>{currentQuestion.question}</h2>
      {shuffledAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={() =>
            handleAnswer(answer === currentQuestion.correct_answer)
          }
        >
          {answer}
        </button>
      ))}
      
    </div>
  );
};

export default Quiz;
