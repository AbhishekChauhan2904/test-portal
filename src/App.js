import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import QuestionDisplay from './components/QuestionDisplay';
import SubmitSummary from './components/SubmitSummary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<QuestionDisplay />} />
            <Route path="/submit-summary" element={<SubmitSummary />} />
           
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
