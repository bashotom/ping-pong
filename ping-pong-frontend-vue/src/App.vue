
<template>
  <div class="game-container">
    <h1>Ping Pong</h1>
    <div class="scoreboard">
      <span>Spieler: {{ game.playerScore }}</span>
      <span>Computer: {{ game.computerScore }}</span>
    </div>
    <div
      class="pong-canvas"
      ref="canvas"
      @mousemove="onMouseMove"
      tabindex="0"
    >
      <svg width="600" height="400">
        <!-- Player Paddle -->
        <rect :y="game.playerPaddleY" x="10" width="20" height="80" fill="#42b883" />
        <!-- Computer Paddle -->
        <rect :y="game.computerPaddleY" x="570" width="20" height="80" fill="#646cff" />
        <!-- Ball -->
        <circle :cx="game.ball.x" :cy="game.ball.y" r="10" fill="#f39c12" />
      </svg>
    </div>
    <button @click="startGame" v-if="!game.isRunning">Spiel starten</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGameStore } from './stores/game';

const game = useGameStore();
const canvas = ref<HTMLDivElement | null>(null);
let interval: number | undefined;

function startGame() {
  game.startGame();
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    game.updateBall();
    game.moveComputerPaddle();
  }, 16) as unknown as number;
}

function onMouseMove(e: MouseEvent) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const y = e.clientY - rect.top - 40;
  game.movePlayerPaddle(y);
}

onMounted(() => {
  if (canvas.value) {
    canvas.value.focus();
  }
});
</script>

<style scoped>
.game-container {
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
}
.pong-canvas {
  margin: 20px auto;
  width: 600px;
  height: 400px;
  background: #222;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}
.scoreboard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.2em;
}
button {
  margin-top: 20px;
  padding: 10px 30px;
  font-size: 1.1em;
  background: #42b883;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #368a6e;
}
</style>
