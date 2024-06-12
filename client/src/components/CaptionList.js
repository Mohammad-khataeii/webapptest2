import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const CaptionList = ({ captions, selectedCaption, onCaptionSelect }) => {
  return (
    <Row className="mt-3">
      {captions.map((caption) => (
        <Col md={4} key={caption.id} className="mb-3">
          <Button
            variant={selectedCaption === caption.id ? 'primary' : 'outline-primary'}
            className="w-100"
            onClick={() => onCaptionSelect(caption.id)}
          >
            {caption.text}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default CaptionList;
