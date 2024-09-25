import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import "./App.css";

const App = () => {
  const [userName, setUserName] = useState("");
  const [numQuestions, setNumQuestions] = useState([]);
  const [category, setCategory] = useState("Choose Category");
  const [options, setOptions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await response.json();
    setQuestions(data.results);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`https://opentdb.com/api_category.php`);
      const data = await response.json();
      setOptions(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const handleStartQuiz = () => {
    fetchQuestions();
    setQuizStarted(true);
  };

  return (
    <div>
      {!quizStarted ? (
        <div>
          <h1>Trivia Quiz</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Choose number of Questions"
            min="5"
            max="30"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose Category</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : (
        <Quiz questions={questions} userName={userName} />
      )}
    </div>
  );
};

export default App;
