import React, { useState, useEffect, useCallback } from 'react';
import './RacingGame.css';

const LANES = 7;
const GAME_WIDTH = 300;
const CAR_WIDTH = 50;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;

const RacingGame = () => {
  const [carLane, setCarLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(5);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft') {
      setCarLane(lane => Math.max(0, lane - 1));
    } else if (e.key === 'ArrowRight') {
      setCarLane(lane => Math.min(LANES - 1, lane + 1));
    }
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      // Move obstacles
      const newObstacles = obstacles.map(obstacle => ({
        ...obstacle,
        top: obstacle.top + gameSpeed,
      })).filter(obstacle => obstacle.top < 500);

      // Add new obstacle
      if (Math.random() < 0.06) {
        const newLane = Math.floor(Math.random() * LANES);
        if (!newObstacles.some(o => o.top < OBSTACLE_HEIGHT && o.lane === newLane)) {
            newObstacles.push({ lane: newLane, top: -OBSTACLE_HEIGHT });
        }
      }
      
      setObstacles(newObstacles);

      // Collision detection
      const carLeft = carLane * (GAME_WIDTH / LANES);
      const carRight = carLeft + CAR_WIDTH;

      obstacles.forEach(obstacle => {
        if (
          obstacle.top > 400 - OBSTACLE_HEIGHT &&
          obstacle.top < 400 + OBSTACLE_HEIGHT &&
          obstacle.lane === carLane
        ) {
          setGameOver(true);
        }
      });

      // Increase score and speed
      setScore(prevScore => prevScore + 1);
      if (score > 0 && score % 500 === 0) {
        setGameSpeed(speed => speed + 1);
      }

    }, 20);

    return () => clearInterval(gameInterval);
  }, [obstacles, carLane, gameOver, score, gameSpeed]);

  const restartGame = () => {
    setCarLane(1);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setGameSpeed(5);
  };

  const laneWidth = GAME_WIDTH / LANES;
  const carLeftPosition = carLane * laneWidth + (laneWidth - CAR_WIDTH) / 2;

  return (
    <div className="game-container">
      <h1>React Racing Game</h1>
      <div className="game-board" style={{ width: `${GAME_WIDTH}px` }}>
        {gameOver ? (
          <div className="game-over">
            <h2>Game Over</h2>
            <p>Your Score: {score}</p>
            <button onClick={restartGame}>Restart</button>
          </div>
        ) : (
          <>
            <div className="car" style={{ left: `${carLeftPosition}px` }}></div>
            {obstacles.map((obstacle, index) => (
              <div
                key={index}
                className="obstacle"
                style={{
                  left: `${obstacle.lane * laneWidth + (laneWidth - OBSTACLE_WIDTH) / 2}px`,
                  top: `${obstacle.top}px`,
                }}
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="score">Score: {score}</div>
      <div className="instructions">
        <p>Use Left and Right arrow keys to move.</p>
      </div>
    </div>
  );
};

export default RacingGame;
