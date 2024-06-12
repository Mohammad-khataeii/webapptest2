import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const MemeDisplay = ({ meme }) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        {meme && (
          <Card>
            <Card.Img variant="top" src={meme.url} alt="Meme" />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default MemeDisplay;
