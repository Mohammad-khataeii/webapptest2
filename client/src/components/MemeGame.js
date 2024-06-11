import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import MemeDisplay from './MemeDisplay';
import CaptionList from './CaptionList';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import ResultComponent from './ResultComponent';
import { fetchRandomMeme, fetchRandomCaptions, submitGameResult } from '../services/api';


const MemeGame = () => {
  const [meme, setMeme] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const totalRounds = 5; // Total number of rounds for the game
  const timerDuration = 30; // 30 seconds for each round

  useEffect(() => {
    if (round < totalRounds) {
      fetchMemeAndCaptions();
    } else {
      setGameOver(true);
    }
  }, [round]);

  const fetchMemeAndCaptions = async () => {
    try {
      const memeResponse = await fetchRandomMeme();
      const captionsResponse = await fetchRandomCaptions();
      setMeme(memeResponse);
      setCaptions(captionsResponse);
      setSelectedCaption(null);
      setMessage('');
    } catch (error) {
      console.error('Error fetching meme or captions', error);
    }
  };

  const handleCaptionSelect = (captionId) => {
    setSelectedCaption(captionId);
  };

  const handleSubmit = async () => {
    if (selectedCaption === null) {
      setMessage('Please select a caption.');
      return;
    }

    try {
      const response = await submitGameResult(meme.id, selectedCaption);
      const isCorrect = response.isBestMatch;
      setResults([...results, { correct: isCorrect }]);

      if (isCorrect) {
        setScore(score + 1);
        setMessage('Correct! Great job.');
      } else {
        setMessage('Incorrect. Better luck next time.');
      }

      setRound(round + 1);
    } catch (error) {
      console.error('Error submitting selection', error);
    }
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleRestart = () => {
    setScore(0);
    setRound(0);
    setResults([]);
    setGameOver(false);
  };

  return (
    <Container className="mt-5">
      {gameOver ? (
        <ResultComponent score={score} totalRounds={totalRounds} results={results} onRestart={handleRestart} />
      ) : (
        <>
          <h2 className="text-center">Meme Game</h2>
          <MemeDisplay meme={meme} />
          <Timer duration={timerDuration} onTimeUp={handleTimeUp} />
          <CaptionList
            captions={captions}
            selectedCaption={selectedCaption}
            onCaptionSelect={handleCaptionSelect}
          />
          <Row className="mt-3 justify-content-md-center">
            <Col md={4}>
              <Button variant="success" className="w-100" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
          {message && (
            <Row className="mt-3">
              <Col>
                <Alert variant={message.includes('Correct') ? 'success' : 'danger'} className="text-center">
                  {message}
                </Alert>
              </Col>
            </Row>
          )}
          <ScoreBoard score={score} round={round} />
        </>
      )}
    </Container>
  );
};

export default MemeGame;
