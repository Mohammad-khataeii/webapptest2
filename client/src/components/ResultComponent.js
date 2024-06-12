import React from 'react';
import { Container, Card, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap';

const ResultComponent = ({ score, totalRounds, results, onRestart }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Game Results</Card.Title>
              <Card.Text className="text-center">
                <strong>Total Score:</strong> {score}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Total Rounds:</strong> {totalRounds}
              </Card.Text>
              <ListGroup className="mt-3">
                {results.map((result, index) => (
                  <ListGroupItem key={index}>
                    <strong>Round {index + 1}:</strong> {result.correct ? 'Correct' : 'Incorrect'}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <div className="text-center mt-3">
                <Button variant="primary" onClick={onRestart}>
                  Play Again
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResultComponent;
