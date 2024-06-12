import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import MemeGame from './MemeGame';
import ProtectedRoute from '../utils/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div>
        <BootstrapNavbar bg="light" expand="lg">
          <Container>
            <BootstrapNavbar.Brand href="/">Meme Game</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/game">Game</Nav.Link>
              </Nav>
            </BootstrapNavbar.Collapse>
          </Container>
        </BootstrapNavbar>
        <Container className="mt-3">
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
        </Container>
      </div>
    </Router>
  );
};

export default App;
