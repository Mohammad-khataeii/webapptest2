import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchUserProfile, fetchGameHistory } from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userProfile = await fetchUserProfile();
      setUser(userProfile);
    };

    const fetchHistoryData = async () => {
      const history = await fetchGameHistory();
      setGameHistory(history);
    };

    fetchProfileData();
    fetchHistoryData();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          {user && (
            <Card>
              <Card.Body>
                <Card.Title>{user.username}'s Profile</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Joined: {new Date(user.createdAt).toLocaleDateString()}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Game History</h3>
          {gameHistory.length > 0 ? (
            <ListGroup>
              {gameHistory.map((game) => (
                <ListGroupItem key={game.id}>
                  <strong>Score:</strong> {game.score} - <strong>Date:</strong> {new Date(game.date).toLocaleDateString()}
                </ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <p>No game history available.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
