import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2>Welcome to the Test Portal</h2>
      <p>Take our mock test to practice your skills!</p>
      <Link to="/test">
        <button>Start Test</button>
      </Link>
    </div>
  );
};

export default LandingPage;
