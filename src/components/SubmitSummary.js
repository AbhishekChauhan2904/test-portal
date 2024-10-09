import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmitSummary.css';

const SubmitSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || {};

  if (!answers || !questions) {
    return (
      <div className="submit-summary">
        <h2>No Test Data Found</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleBackToTest = () => {
    navigate('/test', { state: { answers, questions } });
  };

  return (
    <div className="submit-summary">
      <h2>Test Summary</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={question.id} className="summary-item">
            <p><strong>Question {index + 1}:</strong> {question.question}</p>
            <p>
              <strong>Selected Answer:</strong>{' '}
              {answers[index] !== null ? question.options[answers[index]] : 'Not Answered'}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={handleBackToTest}>Back to Test</button>
    </div>
  );
};

export default SubmitSummary;
