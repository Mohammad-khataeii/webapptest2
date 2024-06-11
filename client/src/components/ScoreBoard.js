import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ScoreBoard = ({ score, round }) => {
  return (
    <Row className="mt-3 justify-content-md-center">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center">Score Board</Card.Title>
            <Card.Text className="text-center">
              <strong>Score:</strong> {score}
            </Card.Text>
            <Card.Text className="text-center">
              <strong>Round:</strong> {round}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ScoreBoard;
