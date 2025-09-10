

import React, { useRef, useEffect, useState } from 'react';
import './App.css';

const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 20;
const BALL_RADIUS = 10;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PLAYER_X = 10;
const COMPUTER_X = 570;
const BALL_SPEED = 5;
const COMPUTER_SPEED = 4.5;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

type Ball = { x: number; y: number; vx: number; vy: number };

const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [playerPaddleY, setPlayerPaddleY] = useState(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [computerPaddleY, setComputerPaddleY] = useState(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ball, setBall] = useState<Ball>({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, vx: BALL_SPEED, vy: BALL_SPEED });
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Mouse movement for player paddle
  const onMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    let y = e.clientY - rect.top - PADDLE_HEIGHT / 2;
    y = clamp(y, 0, CANVAS_HEIGHT - PADDLE_HEIGHT);
    setPlayerPaddleY(y);
  };

  // Start/Stop game
  const startGame = () => {
    setIsRunning(true);
    setBall({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, vx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1), vy: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1) });
    setScore({ player: 0, computer: 0 });
    setPlayerPaddleY(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setComputerPaddleY(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  };


  // Main game loop (smooth, rAF-based)
  useEffect(() => {
    let animationId: number;
    if (!isRunning) return;

    let lastTime = performance.now();
    let localBall = { ...ball };
    let localComputerPaddleY = computerPaddleY;

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 16, 2); // dt in 60fps steps, capped
      lastTime = now;

      // Ball movement
      localBall.x += localBall.vx * dt;
      localBall.y += localBall.vy * dt;
      // Top/bottom collision
      if (localBall.y - BALL_RADIUS < 0 || localBall.y + BALL_RADIUS > CANVAS_HEIGHT) {
        localBall.vy = -localBall.vy;
        localBall.y = clamp(localBall.y, BALL_RADIUS, CANVAS_HEIGHT - BALL_RADIUS);
      }
      // Player paddle collision
      if (
        localBall.x - BALL_RADIUS < PLAYER_X + PADDLE_WIDTH &&
        localBall.y + BALL_RADIUS > playerPaddleY &&
        localBall.y - BALL_RADIUS < playerPaddleY + PADDLE_HEIGHT
      ) {
        localBall.vx = Math.abs(localBall.vx);
        localBall.x = PLAYER_X + PADDLE_WIDTH + BALL_RADIUS;
      }
      // Computer paddle collision
      if (
        localBall.x + BALL_RADIUS > COMPUTER_X &&
        localBall.y + BALL_RADIUS > localComputerPaddleY &&
        localBall.y - BALL_RADIUS < localComputerPaddleY + PADDLE_HEIGHT
      ) {
        localBall.vx = -Math.abs(localBall.vx);
        localBall.x = COMPUTER_X - BALL_RADIUS;
      }
      // Score
      if (localBall.x < 0) {
        setScore(s => ({ ...s, computer: s.computer + 1 }));
        localBall = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, vx: BALL_SPEED, vy: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1) };
      }
      if (localBall.x > CANVAS_WIDTH) {
        setScore(s => ({ ...s, player: s.player + 1 }));
        localBall = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, vx: -BALL_SPEED, vy: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1) };
      }

      // Computer AI: smooth follow
      const target = localBall.y - PADDLE_HEIGHT / 2;
      const diff = target - localComputerPaddleY;
      localComputerPaddleY += clamp(diff, -COMPUTER_SPEED * dt, COMPUTER_SPEED * dt);
      localComputerPaddleY = clamp(localComputerPaddleY, 0, CANVAS_HEIGHT - PADDLE_HEIGHT);

      setBall({ ...localBall });
      setComputerPaddleY(localComputerPaddleY);

      animationId = requestAnimationFrame(loop);
    }
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, [isRunning, playerPaddleY]);

  return (
    <div className="game-container">
      <h1>Ping Pong</h1>
      <div className="scoreboard">
        <span>Spieler: {score.player}</span>
        <span>Computer: {score.computer}</span>
      </div>
      <div
        className="pong-canvas"
        tabIndex={0}
      >
        <svg
          ref={svgRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseMove={onMouseMove}
          style={{ display: 'block', margin: '0 auto', outline: 'none' }}
        >
          {/* Player Paddle */}
          <rect y={playerPaddleY} x={PLAYER_X} width={PADDLE_WIDTH} height={PADDLE_HEIGHT} fill="#42b883" />
          {/* Computer Paddle */}
          <rect y={computerPaddleY} x={COMPUTER_X} width={PADDLE_WIDTH} height={PADDLE_HEIGHT} fill="#646cff" />
          {/* Ball */}
          <circle cx={ball.x} cy={ball.y} r={BALL_RADIUS} fill="#f39c12" />
        </svg>
      </div>
      {!isRunning && (
        <button onClick={startGame}>Spiel starten</button>
      )}
    </div>
  );
};

export default App;
