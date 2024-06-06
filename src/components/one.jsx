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
    question: "Which Subject do you like?",
    type: "button",
    options: ["Math", "Science", "History", "Art"]
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
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    setSelectedOption(""); // Reset selected option for the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    console.log("User Answers:", newAnswers); // Use newAnswers here instead of answers
    // You can perform any further actions here after submitting the form
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <div key={index}>
            <label>{question.question}</label>
            {question.type === "button" && (
              <div>
                {index === currentQuestionIndex ? (
                  question.options.map((option, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      style={{ background: option === selectedOption ? 'lightblue' : 'none' }}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <div>Answer: {answers[index]}</div>
                )}
                {index === currentQuestionIndex && (
                  <input
                    type="text"
                    value={selectedOption}
                    readOnly
                  />
                )}
              </div>
            )}
            {question.type === "text" && (
              <input
                type="text"
                value={index === currentQuestionIndex ? selectedOption : answers[index]}
                onChange={(e) => setSelectedOption(e.target.value)}
                readOnly={index !== currentQuestionIndex}
              />
            )}
            {index < currentQuestionIndex && (
              <div>Answer: {answers[index]}</div>
            )}
          </div>
        ))}
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="button" onClick={handleNextQuestion}>
            Next
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default Questionnaire;
