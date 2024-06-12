import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import MemeGame from './components/MemeGame';
import ProtectedRoute from './utils/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/game" element={
          <ProtectedRoute>
            <MemeGame />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
