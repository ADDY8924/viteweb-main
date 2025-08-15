import React, { useState, useEffect, useCallback } from 'react';
import './RacingGame.css';

const LANES = 15;
const GAME_WIDTH = 500;
const CAR_WIDTH = 40;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 50;

const RacingGame = () => {
  const [carLane, setCarLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(8);

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

  const [lastSpawnTimes, setLastSpawnTimes] = useState(() => new Array(LANES).fill(0));
  const [recentSpawns, setRecentSpawns] = useState([]);

  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      // --- Obstacle Spawning Logic ---
      const spawnProbability = 0.8;
      if (Math.random() < spawnProbability) {
        const now = Date.now();
        const newLane = Math.floor(Math.random() * LANES);

        // Cooldown checks
        const sameLaneCooldown = 2000;
        const isSameLaneCooldownActive = now - lastSpawnTimes[newLane] < sameLaneCooldown;

        let isAdjacentCooldownActive = false;
        if (recentSpawns.length === 2) {
          const [lastSpawn, prevSpawn] = recentSpawns;
          const isAdjacent = Math.abs(lastSpawn.lane - prevSpawn.lane) === 1;
          const isRecent = lastSpawn.time - prevSpawn.time < 1500; // 1.5 second
          if (isAdjacent && isRecent) {
            const blockedLane = prevSpawn.lane + (prevSpawn.lane - lastSpawn.lane);
            if (newLane === blockedLane) {
              if (now - lastSpawn.time < 1500) {
                isAdjacentCooldownActive = true;
              }
            }
          }
        }

        if (!isSameLaneCooldownActive && !isAdjacentCooldownActive) {
          setObstacles(currentObstacles => [...currentObstacles, { lane: newLane, top: -OBSTACLE_HEIGHT }]);
          setLastSpawnTimes(currentTimes => {
            const newTimes = [...currentTimes];
            newTimes[newLane] = now;
            return newTimes;
          });
          setRecentSpawns(currentSpawns => [...currentSpawns, { lane: newLane, time: now }].slice(-2));
        }
      }

      // --- Obstacle Movement, Cleanup, and Collision Detection ---
      setObstacles(currentObstacles => {
        const newObstacles = [];
        let collisionDetected = false;

        for (const obstacle of currentObstacles) {
          const newTop = obstacle.top + gameSpeed;

          // Cleanup
          if (newTop >= 650) {
            continue;
          }

          // Collision detection
          const carTop = 650 - 10 - 56;
          const carBottom = 650 - 10;
          const obstacleBottom = newTop + OBSTACLE_HEIGHT;
          if (
            obstacle.lane === carLane &&
            obstacleBottom > carTop &&
            newTop < carBottom
          ) {
            collisionDetected = true;
          }
          
          newObstacles.push({ ...obstacle, top: newTop });
        }

        if (collisionDetected) {
          setGameOver(true);
        }
        
        return newObstacles;
      });

      // --- Score and Speed Increase ---
      if (!gameOver) {
        setScore(prevScore => prevScore + 1);
        if (score > 0 && score % 500 === 0) {
          setGameSpeed(speed => speed + 1);
        }
      }
    }, 20);

    return () => clearInterval(gameInterval);
  }, [carLane, gameOver, gameSpeed, lastSpawnTimes, recentSpawns, score]);

  const restartGame = () => {
    setCarLane(1);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setGameSpeed(8);
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
