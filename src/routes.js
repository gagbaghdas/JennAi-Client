import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Onboarding from './components/Onboarding';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import Dashboard from './components/Dashboard';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={
            <PublicRoute>
                <LoginPage />
            </PublicRoute>} 
        />
        <Route path="/signup"  element={
            <PublicRoute>
                <SignupPage />
            </PublicRoute>} 
        />
        <Route path="/welcome"  element={
            <PrivateRoute>
                <Onboarding />
            </PrivateRoute>} 
        />
        <Route path="/dashboard"  element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default Routing;
