// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/get_question/${questionId}`);
      setCurrentQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
      setCurrentQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = async (answer) => {
    try {
      const response = await axios.post('/check_answer', {
        question_id: questionId,
        answer: answer
      });
      if (response.data.result === 'correct') {
        setScore(score + 1);
      }
      setQuestionId(questionId + 1);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentQuestion) {
    return <div>No more questions available. Your score is {score}.</div>;
  }

  return (
    <div>
      <Question
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        handleAnswerClick={handleAnswerClick}
      />
    </div>
  );
};

export default Quiz;
