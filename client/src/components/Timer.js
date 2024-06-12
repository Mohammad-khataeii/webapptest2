import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset timer when duration changes
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          onTimeUp(); // Call onTimeUp function when timer reaches 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [duration, onTimeUp]);

  return (
    <div className="timer-container">
      <ProgressBar now={(timeLeft / duration) * 100} />
      <p className="text-center">{timeLeft} seconds left</p>
    </div>
  );
};

export default Timer;
