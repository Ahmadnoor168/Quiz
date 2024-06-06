// src/Questionnaire.js
import React, { useState } from 'react';

const questions = [
  {
    question: "How are you feeling today?",
    type: "button",
    options: ["Good", "Okay", "Bad"]
  },
  {
    question: "What did you do yesterday?",
    type: "text",
    options: []
  },
  {
    question: "What are your goals for today?",
    type: "text",
    options: []
  },
  {
    question: "How often do you exercise?",
    type: "button",
    options: ["Daily", "Weekly", "Monthly", "Rarely"]
  },
  {
    question: "Do you feel stressed recently?",
    type: "button",
    options: ["Yes", "No"]
  },
  {
    question: "How much sleep did you get last night?",
    type: "button",
    options: ["<5 hours", "5-7 hours", "7-9 hours", ">9 hours"]
  },
  {
    question: "What are your hobbies?",
    type: "text",
    options: ["Reading", "Traveling", "Cooking", "Sports"]
  },
  {
    question: "Do you have any upcoming events you're looking forward to?",
    type: "text",
    options: []
  },
  {
    question: "How do you manage your stress?",
    type: "text",
    options: []
  },
  {
    question: "What is something you're grateful for today?",
    type: "text",
    options: []
  }
];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [customHobby, setCustomHobby] = useState("");

  const handleTextChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleCustomHobbyChange = (event) => {
    setCustomHobby(event.target.value);
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].type === "text" && questions[currentQuestionIndex].options.length > 0) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = customHobby;
      setAnswers(newAnswers);
      setCustomHobby("");
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User Answers:", answers);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
<form onSubmit={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNextQuestion}>
      <div>
        <label>{currentQuestion.question}</label>
        {currentQuestion.type === "text" && currentQuestion.options.length === 0 ? (
          <input
            type="text"
            value={answers[currentQuestionIndex]}
            onChange={handleTextChange}
          />
        ) : currentQuestion.type === "text" && currentQuestion.options.length > 0 ? (
          <div>
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              placeholder="Enter your hobby"
              value={customHobby}
              onChange={handleCustomHobbyChange}
            />
            <input
              type="text"
              value={answers[currentQuestionIndex]}
              readOnly
            />
          </div>
        ) : (
          <div>
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              value={answers[currentQuestionIndex]}
              readOnly
            />
          </div>
        )}
      </div>
      {currentQuestionIndex < questions.length - 1 ? (
        <button type="button" onClick={handleNextQuestion}>
          Next
        </button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default Questionnaire;
