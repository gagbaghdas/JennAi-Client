import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup"  element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default Routing;
