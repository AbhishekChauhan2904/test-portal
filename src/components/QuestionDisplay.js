import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionDisplay.css';

const mockQuestions = [
  {
    id: 1,
    question: 'What is React?',
    options: ['A library', 'A framework', 'A language', 'None of the above'],
  },
  {
    id: 2,
    question: 'What is JSX?',
    options: ['JavaScript Syntax', 'JavaScript XML', 'Java Server eXtension', 'None'],
  },
  {
    id: 3,
    question: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
  },
  {
    id: 4,
    question: 'What is the state in React?',
    options: ['A permanent storage', 'A temporary storage', 'A prop', 'None'],
  },
  {
    id: 5,
    question: 'What are hooks in React?',
    options: ['Functions', 'Classes', 'Objects', 'None'],
  },
  {
    id: 6,
    question: 'What is Virtual DOM?',
    options: ['A real DOM', 'A lightweight copy of the real DOM', 'A library', 'None'],
  },
  {
    id: 7,
    question: 'What is Redux?',
    options: ['A state management tool', 'A CSS framework', 'A testing library', 'None'],
  },
  {
    id: 8,
    question: 'What is Next.js?',
    options: ['A React framework', 'A backend framework', 'A database', 'None'],
  },
  {
    id: 9,
    question: 'What is TypeScript?',
    options: ['A superset of JavaScript', 'A framework', 'A library', 'None'],
  },
  {
    id: 10,
    question: 'What is the purpose of useEffect hook?',
    options: ['To manage state', 'To perform side effects', 'To create refs', 'None'],
  },
];

const QuestionDisplay = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(mockQuestions.length).fill(null));
  const [timer, setTimer] = useState(600);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    navigate('/submit-summary', { state: { answers, questions: mockQuestions } });
  };

  return (
    <div className="test-portal">
      <div className="question-display">
        <h3>{mockQuestions[currentQuestion].question}</h3>
        {mockQuestions[currentQuestion].options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              checked={answers[currentQuestion] === index}
              onChange={() => handleAnswerSelect(index)}
            />
            {option}
          </label>
        ))}
        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentQuestion === mockQuestions.length - 1}>
            Next
          </button>
          <button onClick={handleSubmit}>Submit Test</button>
        </div>

        <div className="timer">
          <p>Time Remaining: {formatTime(timer)}</p>
        </div>
      </div>

      <div className="question-legend">
        {mockQuestions.map((_, index) => (
          <button
            key={index}
            className={`legend-button ${index === currentQuestion ? 'current' : ''} ${
              answers[index] !== null ? 'answered' : ''
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
