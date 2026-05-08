// ==========================================
// modules/GameState.js
// Manages the core game state variables and flags
// ==========================================
export const GameState = (() => {
  // Game flow flags
  let gameLoop = null;
  let isPaused = true;
  let gameOver = false;
  let counter = 0;

  // Ball position and velocity
  let x = 448 / 2;        // canvas.width = 448
  let y = 400 - 30;       // canvas.height - 30
  let dx = -3;
  let dy = -3;

  // Paddle position and control flags
  let paddleX = (448 - 50) / 2;   // (canvas.width - paddleWidth) / 2
  let paddleY = 400 - 10 - 10;    // canvas.height - paddleHeight - 10
  let rightPressed = false;
  let leftPressed = false;

  // Getters and setters
  function getGameLoop() { return gameLoop; }
  function setGameLoop(loop) { gameLoop = loop; }

  function getIsPaused() { return isPaused; }
  function setIsPaused(paused) { isPaused = paused; }

  function getGameOver() { return gameOver; }
  function setGameOver(over) { gameOver = over; }

  function getCounter() { return counter; }
  function setCounter(value) { counter = value; }
  function addToCounter(value) { counter += value; }
  function resetCounter() { counter = 0; }

  // Ball getters/setters
  function getBallX() { return x; }
  function setBallX(value) { x = value; }
  function getBallY() { return y; }
  function setBallY(value) { y = value; }
  function getBallDx() { return dx; }
  function setBallDx(value) { dx = value; }
  function getBallDy() { return dy; }
  function setBallDy(value) { dy = value; }

  // Paddle getters/setters
  function getPaddleX() { return paddleX; }
  function setPaddleX(value) { paddleX = value; }
  function getPaddleY() { return paddleY; }
  function getRightPressed() { return rightPressed; }
  function setRightPressed(pressed) { rightPressed = pressed; }
  function getLeftPressed() { return leftPressed; }
  function setLeftPressed(pressed) { leftPressed = pressed; }

  return {
    // Game flow
    getGameLoop, setGameLoop,
    getIsPaused, setIsPaused,
    getGameOver, setGameOver,
    getCounter, setCounter, addToCounter, resetCounter,
    // Ball
    getBallX, setBallX,
    getBallY, setBallY,
    getBallDx, setBallDx,
    getBallDy, setBallDy,
    // Paddle
    getPaddleX, setPaddleX,
    getPaddleY,
    getRightPressed, setRightPressed,
    getLeftPressed, setLeftPressed
  };
})();