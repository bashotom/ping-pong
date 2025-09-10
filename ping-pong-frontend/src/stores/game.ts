import { defineStore } from 'pinia';

export interface GameState {
  playerScore: number;
  computerScore: number;
  isRunning: boolean;
  ball: { x: number; y: number; vx: number; vy: number };
  playerPaddleY: number;
  computerPaddleY: number;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    playerScore: 0,
    computerScore: 0,
    isRunning: false,
    ball: { x: 300, y: 200, vx: 4, vy: 4 },
    playerPaddleY: 150,
    computerPaddleY: 150,
  }),
  actions: {
    startGame() {
      this.isRunning = true;
      this.playerScore = 0;
      this.computerScore = 0;
      this.ball = { x: 300, y: 200, vx: 4, vy: 4 };
      this.playerPaddleY = 150;
      this.computerPaddleY = 150;
    },
    resetBall() {
      this.ball = { x: 300, y: 200, vx: 4, vy: 4 };
    },
    scorePoint(player: 'player' | 'computer') {
      if (player === 'player') this.playerScore++;
      else this.computerScore++;
      this.resetBall();
    },
    updateBall() {
      if (!this.isRunning) return;
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      // Ball collision with top/bottom
      if (this.ball.y <= 0 || this.ball.y >= 400) this.ball.vy *= -1;
      // Ball collision with paddles
      if (
        this.ball.x <= 30 &&
        this.ball.y > this.playerPaddleY &&
        this.ball.y < this.playerPaddleY + 80
      ) {
        this.ball.vx *= -1;
      }
      if (
        this.ball.x >= 570 &&
        this.ball.y > this.computerPaddleY &&
        this.ball.y < this.computerPaddleY + 80
      ) {
        this.ball.vx *= -1;
      }
      // Score
      if (this.ball.x < 0) this.scorePoint('computer');
      if (this.ball.x > 600) this.scorePoint('player');
    },
    movePlayerPaddle(y: number) {
      this.playerPaddleY = Math.max(0, Math.min(320, y));
    },
    moveComputerPaddle() {
      // Make the computer easier to beat: slower paddle and random error
      const speed = 3.6; // slower than before
      const error = (Math.random() - 0.5) * 10; // random error
      if (this.ball.y > this.computerPaddleY + 40 + error) this.computerPaddleY += speed;
      else if (this.ball.y < this.computerPaddleY + 40 + error) this.computerPaddleY -= speed;
      this.computerPaddleY = Math.max(0, Math.min(320, this.computerPaddleY));
    },
  },
});
